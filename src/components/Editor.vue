<template>
  <Drawer :title="title" :width="720" v-model="show" :mask-closable="false" :closable="false">
    <Form :model="datas" label-position="left" :label-width="80">
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="项目名称" :rules="{ required: true, message: '项目名称必须输入' }" prop="name">
            <Input v-model="datas.name" placeholder="请输入名称" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem
            label="项目描述"
            :rules="{ required: true, message: '这里需要输入项目的具体描述信息' }"
            prop="description"
          >
            <Input
              v-model="datas.description"
              type="textarea"
              placeholder="请输入项目描述"
              :autosize="{minRows: 2, maxRows: 6}"
            />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="发起部门" :rules="{ required: true, message: '发起部门' }" prop="department">
            <Input v-model="datas.department" placeholder="请输入发起部门" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="发起人" :rules="{ required: true, message: '发起人' }" prop="handler">
            <Input v-model="datas.handler" placeholder="请输入发起人" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="附件">
            <template v-if="datas.attachments && datas.attachments.length !== 0">
              <Card v-for="(item, i) of datas.attachments" class="upload-list">
                <Icon custom="iconfont icon-xls" size="52" />
                <p class="upload-item-desc">xxxxxxxxxxxxxxxxxxxxxx.xls</p>
                <div class="upload-list-cover">
                  <Icon custom="iconfont icon-delete" />
                </div>
              </Card>
            </template>

            <Upload
              multiple
              type="drag"
              :before-upload="beforeUpload"
              :show-upload-list="false"
              action="//jsonplaceholder.typicode.com/posts/"
              class="upload-list"
            >
              <Icon custom="iconfont icon-plus" size="52" />
            </Upload>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="drawer-footer">
      <Button style="margin-right: 8px" @click="show = false" custom-icon="iconfont icon-close">取消</Button>
      <Button type="primary" @click="show = false" custom-icon="iconfont icon-save">保存</Button>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProjectInfo } from '@/types/projs';

@Component
export default class Editor extends Vue {
  @Prop({ type: Boolean, default: false })
  private show!: boolean;

  @Prop(Object)
  private items!: ProjectInfo;

  @Prop(String)
  private title!: string;

  private get datas(): ProjectInfo {
    return JSON.parse(JSON.stringify(this.items));
  }

  private beforeUpload(file: File) {
    console.log(file);
    return false;
  }
}
</script>

<style lang="scss">
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}

.ivu-upload .ivu-upload-drag {
  height: 100%;
  display: flex;
  i {
    margin: 20px;
  }
}

.upload-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-right: 4px;

  &:hover .upload-list-cover {
    display: block;
  }

  .upload-item-desc {
    width: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    margin: 0;
  }
}

.upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);

  i {
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    margin: 30px;
  }
}
</style>
