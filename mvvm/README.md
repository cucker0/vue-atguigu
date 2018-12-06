# MVVM

https://github.com/DMQ/mvvm
===========================

## 说明
```
Dep
    它的实例什么时候创建？
        初始化给data的属性进行数据劫持时创建的
    个数？
        与data中的属性一一对应
    Dep的结构？
        id：标识
        subs: []   个相关的watcher的容器

watcher
     它的实例什么时候创建？
        初始化时解析双大括号表达式/一般指令时创建
     个数？
        与模板中表达式（不包含事件指令）一一对应
     watcher结构
        this.cb = cb;   //用于更新界面的回调函数
        this.vm = vm; //vm
        this.exp = exp; //对应的表达式
        this.depIds = {depid: dep}; //相关的n个dep的容器
        this.value = this.get(); //当前表达式对应的值
Dep与Watcher的关系
    什么关系
        多对多的关系
        data属性-->Dep-->n个watcher(模板中有多个表达式使用了此属性：{{a}} / v-test="a")
        表达式-->watcher-->n个Dep(多层表达式：a.b.c)
    如何建立的
        data中的属性get()中建立
    什么时候建立
        初始化的解析模块中的表达式创建watcher对象时

```
