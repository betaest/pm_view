<template>
  <Layout>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="home">
        <MenuItem name="home" to="/">Home</MenuItem>
        <MenuItem name="proj" to="/ProjectManager">项目管理</MenuItem>
      </Menu>
    </Header>
    <Content>
      <router-view />
    </Content>
  </Layout>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
</style>
