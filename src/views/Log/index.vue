<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { ElMessage, ElTableColumn, ElFormItem, ElInput, ElSelect, ElOption, ElDatePicker, ElButton } from 'element-plus';
import { ContentWrap } from '@/components/ContentWrap';
import { useFetchList } from '@/hooks/inject/useFetchList';
import { getLogs, platformModules } from '@/api/log';
import { LogSchema } from '@/api/log/types';
import { useSearchIcon } from '@/hooks/inject/usePreIcon';
import FullTable from '@/components/Custom/FullTable.vue';
import { pw } from '@/utils';

const SearchIcon = useSearchIcon();

// 创建表格hook和筛选条件
const { list, fetchList, pagination, isLoading } = useFetchList(getLogs);
const schema: Ref<LogSchema> = ref({});

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
const onSearch = (requestSchema: LogSchema) => {
    schema.value = requestSchema;
    loadData();
};

onMounted(() => loadData());
</script>

<template>
    <ContentWrap>
        <FullTable :list="list" :schema="schema" :loading="isLoading" :pagination="pagination" @load="onSearch">
            <template #filters>
                <ElFormItem>
                    <ElInput v-model="schema.text" placeholder="搜索操作人或关键字" />
                </ElFormItem>
                <ElFormItem>
                    <ElDatePicker v-model="schema.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
                </ElFormItem>
                <ElFormItem>
                    <ElSelect v-model="schema.module" placeholder="请选择模块">
                        <ElOption label="全部模块" value="" />
                        <ElOption v-for="module in platformModules" :key="module.value" :label="module.label" :value="module.value" />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem>
                    <ElButton type="primary" :icon="SearchIcon" native-type="submit">查询</ElButton>
                </ElFormItem>
            </template>
            <template #table>
                <ElTableColumn prop="name" label="操作人" width="180" />
                <ElTableColumn prop="time" label="操作时间" width="180" />
                <ElTableColumn prop="module" label="操作模块" width="180" />
                <ElTableColumn prop="content" label="操作描述" />
            </template>
        </FullTable>
    </ContentWrap>
</template>
