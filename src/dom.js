window.dom = {
  create(string){
    const container = document.createElement("template");
    container.innerHTML = string.trim();  //trim函数是将字符串两边的空格去除
    return container.content.firstChild;
  },
  after(node,node2){  //在节点后插入节点
    //Node.insertBefore() 方法在参考节点之前插入一个拥有指定父节点的子节点。
    //由于没有插入到后面的函数，就要调用父元素的Node.insertBefore()方法，将node2插入到node的下一个节点的前面
    node.parentNode.insertBefore(node2,node.nextSibling);
  },
  before(node,node2){  //在节点前插入节点
    node.parentNode.insertBefore(node2,node);
  },
  append(parent,node){  //插入子节点
    parent.appendChild(node)
  },
  wrap(node,parent){  //新增父节点
    dom.before(node,parent)   //先将div3插入到div2前面
    dom.append(parent,node)
  },

  //删
  remove(node){
    // node.remove(node)  //新方法IE可能不支持
    node.parentNode.removeChild(node)
    return node
  },
  empty(node){   //删除此节点的子节点,并返回数组
    // node.innerHTML=''  //这一句可以直接清空
    const array = []
    // const {childNodes} = node  //==const childNodes = node.childNodes
    // for(let i = 0;i<childNodes.length;i++){
    //   dom.remove(childNodes[i])
    //   array.push(childNodes[i])
    // }
    let x = node.firstChild
    while(x){
      array.push(dom.remove(x))
      x = node.firstChild
    }
    return array
  },
  
  //改
  attr(node,name,value){  //更改div的title
    if(arguments.length === 3){
      node.setAttribute(name,value)
    }else if(arguments.length === 2){   //JS的重载
      return node.getAttribute(name)
    }
  },
  text(node,string){   //更改结点内的内容，会覆盖原有内容
    if(arguments.length === 2){
      if('innerText' in node){   //适配浏览器
        node.innerText = string  //ie及所有浏览器都支持
      }else{
        node.textContent = string  //chrome
      }
    }else if(arguments.length === 1){
      if('innerText' in node){
        return node.innerText
      }else{
        return node.textContent
      }
    }
  },
  html(node,string){  //更改html下的内容
    if(arguments.length === 2){
      node.innerHTML = string
    }else if(arguments.length === 1){
      return node.innerHTML
    }
  },
  style(node,name,value){  //改style样式
    if(arguments.length === 3){
      node.style[name] = value
    }else if(arguments.length === 2){
      if(typeof name === 'string'){    //查看样式
        //dom.style(div,'color')
        return node.style[name]
      }else if(name instanceof Object){   //传入两个值时写入样式
        const object = name
        for(let key in object){
          node.style[key] = object[key]
          // node.style.key//会变成字符串
        }
      }
    }
  },
  class: {   //添加class
    add(node,className){
      node.classList.add(className)
    },
    remove(node,className){
      node.classList.remove(className)
    },
    contains(node,className){
      return node.classList.contains(className)
    }
  },
  on(node,eventName,fn){   //点击事件监听
    node.addEventListener(eventName,fn)
  },
  off(node,eventName,fn){  //关闭事件监听
    node.removeEventListener(eventName,fn)
  },
  find(selector,scope){    //范围内查找元素，并返回数组
    return (scope || document).querySelectorAll(selector)
  },
  parent(node){   //父节点
    console.log(node.parentNode)
    return node.parentNode
  },
  children(node){   //子节点
    console.log(node.children,'123')
    return node.children
  },
  siblings(node){   //兄弟节点
    return Array.from(node.parentNode.children)
    .filter(n=>n!==node)
  },
  next(node){   //下一节点
    let x = node.nextSibling
    while(x && x.nodeType ===3){
      x=x.nextSibling
    }
    return x
  },
  previous(node){   //前一个节点
    let x = node.previousSibling
    while(x && x.nodeType ===3){
      x=x.previousSibling
    }
    return x
  },
  each(nodeList,fn){   //遍历节点
    for(let i=0;i<nodeList.length;i++){
      fn.call(null,nodeList[i])
    }
  },
  index(node){
    const list = dom.children(node.parentNode)
    for(i=0;i<list.length;i++){
      if(list[i]===node){
        break
      }
    }
    return i
  }
};