<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { ElMessage, ElTableColumn, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElLink, ElSwitch, ElMessageBox } from 'element-plus';
import { ContentWrap } from '@/components/ContentWrap';
import { useFetchList } from '@/hooks/inject/useFetchList';
import { useSearchIcon, usePlusIcon } from '@/hooks/inject/usePreIcon';
import FullTable from '@/components/Custom/FullTable.vue';
import { pw } from '@/utils';
import { getUsers, userStates, updateState, removeUser } from '@/api/auth/user';
import { User, UserSchema, UserState } from '@/api/auth/user/types';

const SearchIcon = useSearchIcon();
const PlusIcon = usePlusIcon();
const fullscreenLoading: Ref<boolean> = ref(false);

// 创建表格hook和筛选条件
const { list, fetchList, pagination, isLoading } = useFetchList(getUsers);
const schema: Ref<UserSchema> = ref({});

/**
 * 加载数据
 */
const loadData = async () => {
    const [error] = await pw(fetchList(schema.value));

    if (error) {
        ElMessage.error(error.message || '请求错误');
        return;
    }
};

/**
 * 表格筛选
 */
const onSearch = (requestSchema: UserSchema) => {
    schema.value = requestSchema;
    loadData();
};

onMounted(() => loadData());

const onUpdate = (row) => {
    console.log(row);
};

const onRemove = async (row: User) => {
    const [confirmError] = await pw(
        ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            confirmButtonClass: 'el-button--danger'
        })
    );

    if (confirmError) {
        return;
    }

    fullscreenLoading.value = true;

    const [error, result] = await pw(removeUser(row.id));

    fullscreenLoading.value = false;

    if (error) {
        ElMessage.error(error.message || '请求错误');
        return;
    }

    loadData();
    ElMessage.success(result);
};

/**
 * 是否已启用
 */
const isOpenState = (state: UserState): boolean => {
    return state == '1';
};

/**
 * 切换状态
 */
const onChangeState = (row: User) => {
    row.loading = true;

    const afterState: UserState = row.state == '1' ? '0' : '1';

    updateState(row.id, afterState)
        .then(() => {
            row.state = afterState;
        })
        .catch((error) => {
            ElMessage.error(error.message || '请求错误');
        })
        .finally(() => {
            row.loading = false;
        });
};
</script>

<template>
    <ContentWrap v-loading.fullscreen.lock="fullscreenLoading">
        <FullTable :list="list" :schema="schema" :loading="isLoading" :pagination="pagination" @load="onSearch">
            <template #filters>
                <ElFormItem>
                    <ElInput v-model="schema.text" placeholder="搜索用户名称或账号" />
                </ElFormItem>
                <ElFormItem>
                    <ElSelect v-model="schema.state" placeholder="请选择状态">
                        <ElOption label="全部状态" value="" />
                        <ElOption v-for="user in userStates" :key="user.value" :label="user.label" :value="user.value" />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem>
                    <ElButton type="primary" :icon="SearchIcon" native-type="submit">查询</ElButton>
                </ElFormItem>
                <ElFormItem>
                    <ElButton type="success" :icon="PlusIcon" native-type="submit">创建账号</ElButton>
                </ElFormItem>
            </template>
            <template #table>
                <ElTableColumn prop="name" label="用户名称" width="180" />
                <ElTableColumn prop="account" label="登录账号" width="180" />
                <ElTableColumn prop="content" label="拥有角色" />
                <ElTableColumn prop="state" label="状态" width="180">
                    <template #default="{ row }">
                        <ElSwitch
                            :model-value="isOpenState(row.state)"
                            :loading="row.loading"
                            size="large"
                            inline-prompt
                            active-text="启用"
                            inactive-text="禁用"
                            @change="onChangeState(row)"
                        />
                    </template>
                </ElTableColumn>
                <ElTableColumn label="操作">
                    <template #default="{ row }">
                        <ElLink type="primary" class="mr-4" @click="onUpdate(row)">编辑</ElLink>
                        <ElLink type="primary" class="mr-4" @click="onUpdate(row)">配置角色</ElLink>
                        <ElLink type="primary" class="mr-4" @click="onUpdate(row)">重置密码</ElLink>
                        <ElLink type="danger" @click="onRemove(row)">删除</ElLink>
                    </template>
                </ElTableColumn>
            </template>
        </FullTable>
    </ContentWrap>
</template>
