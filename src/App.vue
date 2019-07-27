<template>
  <Layout>
    <Header style="display: none">
      <Menu mode="horizontal" theme="dark" active-name="proj">
        <MenuItem name="home" to="/">Home</MenuItem>
        <MenuItem name="proj" to="/ProjectManager">项目管理</MenuItem>
        <MenuItem name="bill" to="/BillQuery">计费工具集</MenuItem>
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
