<template>
    <div>
        <el-cascader placeholder="请选择" style="width: 100%;" separator="-" :props="props" :value="value" :options="data"
            @change="handleChange"></el-cascader>
    </div>
</template>

<script>
import { listtotreedatas } from '@/utils/index'
import { appapp } from '@/api/user';
export default {
    props: {
        value: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            data: [],
            props: {
                label: 'name',
                value: 'id'
            }
        }
    },
    methods: {
        async appapp() {
            let res = await appapp()
            this.data = listtotreedatas(res.data.data, 0)
            // console.log(this.data);
        },
        handleChange(e) {
            // console.log(e);
            if (e.length > 0) {
                // console.log();
                this.$emit('input', e[e.length - 1])
            } else {
                this.$emit('input', null)
            }
        }
    },
    components: {

    },
    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {
        this.appapp()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped></style>
