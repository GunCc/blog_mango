import type { BasicColumn } from "./types";
import type { PropType } from "vue"
// 表格接受的参数
export const basicProps = {
    // 列表
    columns: {
        type: [Array] as PropType<BasicColumn[]>,
        default: () => []
    }
}