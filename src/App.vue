<template>
  <div id="app">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="home">
          <MenuItem name="home" to="/">Home</MenuItem>
          <MenuItem name="proj" to="/ProjectManager">项目管理</MenuItem>
        </Menu>
      </Header>
      <Content></Content>
    </Layout>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '/src/fonts/iconfont';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
