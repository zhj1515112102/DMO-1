
const div = dom.create("<div>new div</div>");
console.log(div);

dom.after(test,div);

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test,div3)

//清空操作
const nodes = dom.empty(window.empty)
console.log(nodes)
//改(attribute)操作
dom.attr(test,'title','hi zhj')
const title = dom.attr(test,'title')
console.log(`title: ${title}`)

//内容操作
dom.text(test,'新内容')
dom.text(test)
//style操作
dom.style(test,{border: '1px solid red',color:'blue'})
console.log(dom.style(test,'border'))
dom.style(test,'border','1px solid black')
//class操作
dom.class.add(test,'red')
dom.class.add(test,'blue')
dom.class.remove(test,'blue')
console.log(dom.class.contains(test,'blue'))
//改监听事件
const fn = ()=>{
  console.log('点击了')
}
dom.on(test,'click',fn)
dom.off(test,'click',fn)
//查找(获取)元素
const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red',test2)[0])  //前面将第一个div内的p覆盖了，所以找不到
//查找节点
console.log(dom.parent(test))
console.log(dom.children(test2))
const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))
//遍历子节点
const t = dom.find('#travel')[0]
dom.each(dom.children(t),(n)=>dom.style(n,'color','red'))


console.log(dom.index(s2))

