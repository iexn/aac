<script setup lang="ts">
import { ElTable, ElTableColumn } from 'element-plus';
import { ContentWrap } from '@/components/ContentWrap';

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }
];
</script>

<template>
    <ContentWrap>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="操作人" width="180" />
            <el-table-column prop="name" label="操作时间" width="180" />
            <el-table-column prop="name" label="操作模块" width="180" />
            <el-table-column prop="name" label="操作描述" />
        </el-table>
    </ContentWrap>
</template>
