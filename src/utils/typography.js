import Typography from "typography";

import theme from "typography-theme-moraga";

theme.baseFontSize = "22px";
theme.headerWeight = "400";

const typography = new Typography(theme);
const { scale, rhythm } = typography;

export { rhythm, scale, typography as default };
