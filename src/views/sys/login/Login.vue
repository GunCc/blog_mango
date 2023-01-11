<template>
    <div class="relative w-full h-full px-4">
        <div class="container h-full">
            <Form :model="formData" @finish="handleFinish" @finishFailed="handleFinishFailed">
                <FormItem label="账号" name="username">
                    <Input v-model:value="formData.username"></Input>
                </FormItem>
                <FormItem label="密码" name="password">
                    <Input type="password" v-model:value="formData.password"></Input>
                </FormItem>
                <FormItem label="验证码" name="captcha">
                    <Input v-model:value="formData.captcha"></Input>
                </FormItem>
                <FormItem>
                    <Button html-type="submit">确定</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script setup lang='ts'>
import type { ValidateErrorEntity } from "ant-design-vue/es/form/interface"
import { Form, Button, Input } from "ant-design-vue"
import { reactive } from "vue";
import { useGo } from "@/hooks/web/usePage"
import { PageEnum } from "@/enums/pageEnum";
import type { LoginParams } from "@/api/sys/model/userModel";
import { useUserStore } from "@/stores/modules/user";
let FormItem = Form.Item

const formData = reactive<LoginParams>({
    username: "",
    password: "",
    captcha: "",
})

// 提交表单
function handleFinish(values: LoginParams) {
    console.log(values, formData);
    // go(PageEnum.BASE_HOME, true)
    const userStore = useUserStore();
    userStore.login(formData);
}
// 表单提交失败
function handleFinishFailed(errors: ValidateErrorEntity<LoginParams>) {
    console.log(errors);
}
</script>
<style lang='less' scoped>

</style>