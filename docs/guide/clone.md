# 浅克隆与深克隆
## 浅克隆
浅克隆只是clone了对象的最外面一层，至于更深层的对象，依然是通过引用指向同一块堆内存

```js
function shallowClone(o) {
    const obj = {};
    for (let i in o) { 
        if (o.hasOwnProperty(i)) {
            obj[i] = o[i];
        }
    }
    return obj;
}
const oldObj = {
    a: 1,
    b: [1, 2, 3],
    c: { h: { i: 2 } }
};
const newobj = shallowClone(oldObj);
console.log(newobj.c.h, oldObj.c.h);
console.log(newobj.c.h === oldObj.c.h) //可以看出他们指向同一段堆内存

Object.assign()也可以实现浅复制
```
我们可以看到,很明显虽然`oldObj.c.h`被克隆了,但是它还与`oldObj.c.h`相等,这表明他们依然指向同一段堆内存,这就造成了如果对`newObj.c.h`进行修改,也会影响`oldObj.c.h`,这就不是一版好的克隆.

## 深克隆
### JSON.pares方法
```js
const newObj = JSON.parse(JSON.stringify(oldObj));
```
确实,这个方法虽然可以解决绝大部分是使用场景,但是却有很多坑.

1.他无法实现对函数 、RegExp等特殊对象的克隆
2.会抛弃对象的constructor,所有的构造函数会指向Object
3.对象有循环引用,会报错

### 构造一个深clone函数
工作中一般的方法clone一个对象：
```js
function extendDeeply(target) {
    var length = arguments.length;
    if (length < 2 || target == null) {
        return target;
    }

    for (var index = 1; index < length; index++) {
        var source = arguments[index];

        if (!isObject(source)) {
            continue;
        }

        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (isObject(source[prop])) {
                    target[prop] = extendDeeply({}, target[prop], source[prop]);
                }
                else {
                    target[prop] = source[prop];
                }
            }
        }
    }

    return target;
}
```

更进一步一个完整的深克隆，面对不同的对象(正则、数组、Date等)要采用不同的处理方式，我们需要实现一个对象类型判断函数:
```js
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};
```

做好准备工作，我们就可以实现深克隆
```js
/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};
```
当然,我们这个深克隆还不算完美,例如Buffer对象、Promise、Set、Map可能都需要我们做特殊处理，另外对于确保没有循环引用的对象，我们可以省去对循环引用的特殊处理，因为这很消耗时间，不过一个基本的深克隆函数我们已经实现了