module.exports = {
  css: {
    sourceMap: false,
  },
  chainWebpack: c =>
    c.module
      .rule('vue')
      .use('iview-loader')
      .loader('iview-loader')
      .options({ prefix: false }),
};
