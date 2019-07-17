<template>
  <Drawer :title="title" :width="720" v-model="show" :mask-closable="false" :closable="false">
    <Form :model="items" label-position="left" :label-width="80" ref="form">
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="项目名称" :rules="{ required: true, message: '项目名称必须输入' }" prop="name">
            <Input v-model="items.name" placeholder="请输入名称" />
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
              v-model="items.description"
              type="textarea"
              placeholder="请输入项目描述"
              :autosize="{ minRows: 2, maxRows: 6 }"
            />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="发起部门" :rules="{ required: true, message: '发起部门' }" prop="department">
            <Input v-model="items.department" placeholder="请输入发起部门" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="发起人" :rules="{ required: true, message: '发起人' }" prop="handler">
            <Input v-model="items.handler" placeholder="请输入发起人" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="24">
          <FormItem label="附件">
            <template v-if="items.attachments && items.attachments.length !== 0">
              <div v-for="(item, i) of items.attachments" class="upload-list" :key="i">
                <Icon :custom="`iconfont ${getIcon(item.name)}`" size="52" />
                <p class="upload-item-desc">{{ item.name }}</p>
                <div class="upload-list-cover">
                  <Icon custom="iconfont icon-download" @click.native="download(item)" v-if="item.url" />
                  <Icon custom="iconfont icon-delete" @click.native="remove(item)" />
                </div>
              </div>
            </template>

            <Upload
              multiple
              type="drag"
              :before-upload="beforeUpload"
              :show-upload-list="false"
              action="//jsonplaceholder.typicode.com/posts/"
              class="upload-list"
            >
              <Icon custom="iconfont icon-plus" />
            </Upload>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="drawer-footer">
      <ButtonGroup shape="circle">
        <Button @click="$emit('cancel')" custom-icon="iconfont icon-close">取消</Button>
        <Button type="primary" @click="save" custom-icon="iconfont icon-save">保存</Button>
      </ButtonGroup>
    </div>

    <Spin size="large" fix v-if="saving"></Spin>
  </Drawer>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Ref, Vue } from 'vue-property-decorator';
import { ProjectInfo, AttachmentInfo } from '@/types/projs';
import { download, remove } from '@/utils/data';
import { Form } from 'iview';

@Component
export default class Editor extends Vue {
  @Prop({ type: Boolean, default: false })
  private readonly show!: boolean;

  @Prop(Object)
  private readonly items!: ProjectInfo;

  @Prop(String)
  private readonly title!: string;

  @Ref()
  private readonly form!: Form;

  private saving = false;

  @Watch('show')
  private showChanged(val: boolean, oval: boolean) {
    if (!val) {
      this.saving = false;
      this.form.resetFields();
    }
  }

  private static readonly FileExt = {
    doc: ['xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx', 'pdf'],
    image: ['png', 'jpg', 'jpeg', 'gif'],
    zip: ['zip', 'rar', '7z'],
  };

  private get datas(): ProjectInfo {
    return JSON.parse(JSON.stringify(this.items));
  }

  private getIcon(name: string): string {
    const ext = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
    const type = Editor.FileExt.doc.includes(ext)
      ? ext
      : Editor.FileExt.image.includes(ext)
      ? 'image'
      : Editor.FileExt.zip.includes(ext)
      ? 'zip'
      : 'file';

    return `icon-${type}`;
  }

  private beforeUpload(file: File) {
    this.items.attachments.push(file);

    return false;
  }

  private save() {
    this.form.validate(success => {
      if (success) {
        this.saving = true;

        this.$emit('save', this.items);
      }
    });
  }

  private download(item: AttachmentInfo) {
    download(this.items.id, item.url);
  }

  private async remove(item: AttachmentInfo | File) {
    if ((item as any).url) {
      const a = item as AttachmentInfo;
      const success = await remove(this.items.id, a.url);

      if (success) {
      }
    } else {
      const idx = this.items.attachments.indexOf(item);

      if (idx !== -1) this.items.attachments.splice(idx, 1);
    }
  }
}
</script>

<style lang="scss">
$width: 100px;

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
    font-size: 50px;
    margin: 25px;
  }
}

.upload-list {
  display: inline-block;
  width: $width;
  height: $width;
  text-align: center;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin: 0 0 6px 6px;
  vertical-align: middle;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  &:hover .upload-list-cover {
    display: block;
  }

  i {
    margin: 10px 0 0;
  }

  .upload-item-desc {
    width: $width;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-align: center;
    margin: 5px 0 0;
  }
}

.upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);

  i {
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    margin: 30px 5px 0 0;
  }
}
</style>
