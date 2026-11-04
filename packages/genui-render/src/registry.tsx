import type { GenUIComponent } from "@gen-ui/core";
import type { ReactNode } from "react";

export interface RenderContext {
  onInteract: (
    actionId: string,
    componentId: string,
    context: Record<string, unknown>,
  ) => void;
  state: Record<string, unknown>;
  setStateKey: (key: string, value: unknown) => void;
}

export type ComponentRenderer = (
  component: GenUIComponent,
  ctx: RenderContext,
  renderChild: (c: GenUIComponent) => ReactNode,
) => ReactNode;

const ALLOWLIST = new Set([
  "Stack",
  "Text",
  "Button",
  "Card",
  "Image",
  "Form",
  "Select",
]);

export function isAllowlisted(type: string): boolean {
  return ALLOWLIST.has(type);
}

export function renderFallback(component: GenUIComponent): ReactNode {
  return (
    <div
      className="genui-fallback"
      data-component-id={component.id}
      role="alert"
    >
      Unsupported or invalid component: {component.type}
    </div>
  );
}

export const defaultRegistry: Record<string, ComponentRenderer> = {
  Stack(component, _ctx, renderChild) {
    const direction = (component.props.direction as string) ?? "column";
    const gap = (component.props.gap as number) ?? 12;
    return (
      <div
        className="genui-stack"
        data-component-id={component.id}
        style={{
          display: "flex",
          flexDirection: direction === "row" ? "row" : "column",
          gap,
        }}
      >
        {component.children?.map((child) => renderChild(child))}
      </div>
    );
  },

  Text(component, ctx) {
    let content = String(component.props.content ?? "");
    content = content.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
      const v = ctx.state[key];
      return v === undefined || v === null ? "" : String(v);
    });
    const variant = (component.props.variant as string) ?? "body";
    const Tag = variant === "heading" ? "h2" : "p";
    return (
      <Tag className={`genui-text genui-text--${variant}`} data-component-id={component.id}>
        {content}
      </Tag>
    );
  },

  Button(component, ctx) {
    const label = String(component.props.label ?? "Button");
    const actionId = component.actionId!;
    return (
      <button
        type="button"
        className="genui-button"
        data-component-id={component.id}
        onClick={() =>
          ctx.onInteract(actionId, component.id, {
            ...(component.props.context as Record<string, unknown> | undefined),
          })
        }
      >
        {label}
      </button>
    );
  },

  Card(component, ctx, renderChild) {
    const title = component.props.title as string | undefined;
    const subtitle = component.props.subtitle as string | undefined;
    const inner = (
      <>
        {title ? <h3 className="genui-card__title">{title}</h3> : null}
        {subtitle ? <p className="genui-card__subtitle">{subtitle}</p> : null}
        {component.children?.map((child) => renderChild(child))}
      </>
    );

    const className = "genui-card";
    if (component.actionId) {
      const actionId = component.actionId;
      return (
        <button
          type="button"
          className={`${className} genui-card--interactive`}
          data-component-id={component.id}
          onClick={() =>
            ctx.onInteract(actionId, component.id, {
              meal: title,
              cuisine: subtitle,
              title,
              subtitle,
              ...ctx.state,
              ...(component.props.context as Record<string, unknown> | undefined),
            })
          }
        >
          {inner}
        </button>
      );
    }

    return (
      <div className={className} data-component-id={component.id}>
        {inner}
      </div>
    );
  },

  Image(component) {
    const src = String(component.props.src ?? "");
    const alt = String(component.props.alt ?? "");
    return (
      <img
        className="genui-image"
        data-component-id={component.id}
        src={src}
        alt={alt}
      />
    );
  },

  Select(component, ctx) {
    const stateKey = String(component.props.stateKey ?? component.id);
    const label = String(component.props.label ?? stateKey);
    const options = (component.props.options as { value: string; label: string }[]) ?? [];
    const value = String(ctx.state[stateKey] ?? options[0]?.value ?? "");
    return (
      <label className="genui-select" data-component-id={component.id}>
        <span>{label}</span>
        <select
          value={value}
          onChange={(e) => ctx.setStateKey(stateKey, e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    );
  },

  Form(component, ctx, renderChild) {
    const actionId = component.actionId!;
    return (
      <form
        className="genui-form"
        data-component-id={component.id}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const fields: Record<string, unknown> = {};
          formData.forEach((v, k) => {
            fields[k] = v;
          });
          ctx.onInteract(actionId, component.id, { ...ctx.state, ...fields });
        }}
      >
        {component.children?.map((child) => renderChild(child))}
        <button type="submit" className="genui-button">
          {String(component.props.submitLabel ?? "Submit")}
        </button>
      </form>
    );
  },
};
