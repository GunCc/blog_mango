interface TreeHelpConfig {
    id: string;
    children: string;
    pid: string;
}

// 默认配置
const DEFAULT_CONFIG: TreeHelpConfig = {
    id: 'id',
    children: "children",
    pid: "pid"
}

// 过滤
export function filter<T = any>(
    tree: T[],
    func: (n: T) => boolean,
    config: Partial<TreeHelpConfig> = {},
): T[] {
    config = getConfig(config);
    const children = config.children as string;
    function listFilter(list: T[]) {
        return list
            .map((node: any) => ({ ...node }))
            .filter(node => {
                // 递归调用 对含有children项  进行再次调用自身函数 listFilter
                node[children] = node[children] && listFilter(node[children]);
                // 执行传入的回调 func 进行过滤
                return func(node) || (node[children] && node[children].length);
            })

    }
    return listFilter(tree);
}


/**
 * @description：寻找路径
 * @param tree 目标对象
 * @param func 查询方法
 * @param config 配置id children pid 的 key值
 */
export function findPath<T = any>(
    tree: any,
    func: Fn,
    config: Partial<TreeHelpConfig> = {},
) {
    config = getConfig(config)
    const path: T[] = [];
    const { children } = config;
    const list = [...tree];
    const visitedSet = new Set();
    while (list.length) {
        const node = list[0];
        if (visitedSet.has(node)) {
            path.pop();
            list.shift();
        } else {
            visitedSet.add(node);
            node[children!] && list.unshift(...node[children!]);
            path.push(node);
            if (func(node)) {
                return path
            }
        }
    }
    return null;
}


const getConfig = (
    config: Partial<TreeHelpConfig>
) => Object.assign({}, DEFAULT_CONFIG, config)


/**
 * @description：提取树指定结构
 */

export function treeMap<T = any>(
    treeData: T[],
    opt: {
        children?: string;
        conversion: Fn
    }
): T[] {
    return treeData.map(item => treeMapEach(item, opt))
}

/**
 * @description: 提取树指定结构
 */
export function treeMapEach(
    data: any,
    { children = 'children', conversion }:
        { children?: string; conversion: Fn }
) {
    const haveChildren = Array.isArray(data[children]) && data[children].length > 0
    const conversionData = conversion(data) || {};
    if (haveChildren) {
        return {
            ...conversionData,
            [children]: data[children].map((i: number) => {
                return treeMapEach(i, { children, conversion })
            })
        }
    } else {
        return {
            ...conversionData
        }
    }
}