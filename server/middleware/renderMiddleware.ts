export function renderReact() {
  return async(ctx: any) => {
    console.log("Rendering React with state");
    ctx.render("base");
  };
}