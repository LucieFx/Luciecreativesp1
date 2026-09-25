"use client";

import React from "react";

// Filter out Framer Motion specific animation props so they don't pollute the DOM
function filterMotionProps(props: Record<string, any>) {
  const {
    initial,
    animate,
    exit,
    transition,
    variants,
    whileHover,
    whileTap,
    whileInView,
    whileFocus,
    whileDrag,
    viewport,
    custom,
    layout,
    layoutId,
    transformTemplate,
    onAnimationStart,
    onAnimationComplete,
    onViewportEnter,
    onViewportLeave,
    ...cleanProps
  } = props;
  return cleanProps;
}

const componentCache: Record<string, React.ForwardRefExoticComponent<any>> = {};

function getComponent(tag: string) {
  if (!componentCache[tag]) {
    const Comp = React.forwardRef<any, any>((props, ref) => {
      const cleanProps = filterMotionProps(props);
      return React.createElement(tag, { ...cleanProps, ref });
    });
    Comp.displayName = `motion.${tag}`;
    componentCache[tag] = Comp;
  }
  return componentCache[tag];
}

export const motion: any = new Proxy(
  {},
  {
    get: (_target, prop: string) => getComponent(prop),
  }
);

export const m = motion;

export function AnimatePresence({ children }: { children?: React.ReactNode; [key: string]: any }) {
  return <>{children}</>;
}

export function MotionConfig({ children }: { children?: React.ReactNode; [key: string]: any }) {
  return <>{children}</>;
}

export function LazyMotion({ children }: { children?: React.ReactNode; [key: string]: any }) {
  return <>{children}</>;
}

export const domMax = {};
export const domAnimation = {};

export function useReducedMotion(): boolean {
  return true;
}

export function useInView(_ref?: any, _options?: any): boolean {
  return true;
}

export function useScroll(): {
  scrollY: any;
  scrollX: any;
  scrollYProgress: any;
  scrollXProgress: any;
} {
  const dummyValue = {
    get: () => 1,
    set: () => {},
    on: () => () => {},
    onChange: () => () => {},
  };
  return {
    scrollY: dummyValue,
    scrollX: dummyValue,
    scrollYProgress: dummyValue,
    scrollXProgress: dummyValue,
  };
}

export function useTransform(
  _value: any,
  _inputOrTransformer: any,
  output?: any
): any {
  if (Array.isArray(output)) {
    return output[output.length - 1];
  }
  if (typeof _inputOrTransformer === "function") {
    return _inputOrTransformer(1);
  }
  return output ?? 0;
}

export function useSpring(val: any, _options?: any): any {
  return val;
}

export function useMotionValue(init: any): any {
  return {
    get: () => init,
    set: () => {},
    on: () => () => {},
    onChange: () => () => {},
  };
}

export function useMotionTemplate(
  strings: TemplateStringsArray,
  ...values: any[]
): string {
  return strings.reduce(
    (acc, str, i) => acc + str + (values[i] !== undefined ? values[i] : ""),
    ""
  );
}

export function animate(): { stop: () => void } {
  return { stop: () => {} };
}

export type Variants = Record<string, any>;
export type MotionValue<T = any> = {
  get: () => T;
  set: (v: T) => void;
  on: (event: string, callback: (v: T) => void) => () => void;
};
export type Transition = Record<string, any>;
