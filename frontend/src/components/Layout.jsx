import React from "react";

const Layout = ({ children }) => (
  <div
    data-theme="coffee"
    className="min-h-screen bg-slate-950 relative overflow-hidden"
  >
    {/* Decorative Gradients */}
    <div className="pointer-events-none absolute -top-40 -left-40 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),transparent)] z-0"></div>
    <div className="pointer-events-none absolute top-52 -right-40 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),transparent)] z-0"></div>
    {/* Main Content */}
    <div className="relative z-10">{children}</div>
  </div>
);

export default Layout;
