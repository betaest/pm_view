module.exports = {
  chainWebpack: c => {
    c.module
      .rule('vue')
      .use('iview-loader')
      .loader('iview-loader')
      .options({ prefix: false });
    c.module
      .rule('iview')
      .test(/iview.src.*?js$/)
      .use('babel')
      .loader('babel-loader')
      .end();
  },
  productionSourceMap: false,
};
