# Node

- [Node](#node)
  - [相关背景](#相关背景)
    - [非阻塞](#非阻塞)
    - [事件驱动](#事件驱动)
  - [npm](#npm)
  - [node重要对象](#node重要对象)
  - [模块](#模块)
    - [commonJS规范](#commonjs规范)
  - [事件](#事件)
  - [文件读写](#文件读写)
  - [创建和删除文件目录](#创建和删除文件目录)
  - [流和管道](#流和管道)
    - [stream: 以流的形式读取](#stream-以流的形式读取)
    - [以流的形式写入](#以流的形式写入)
    - [pipe: 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe](#pipe-就像可以把两个水管串成一个更长的水管一样两个流也可以串起来一个readable流和一个writable流串起来后所有的数据自动从readable流进入writable流这种操作叫pipe)
  - [http](#http)
    - [响应一个纯文本](#响应一个纯文本)
    - [响应json](#响应json)
    - [响应html](#响应html)
  - [用模块化思维组织代码](#用模块化思维组织代码)
  - [路由](#路由)
  - [使用get和post发送数据](#使用get和post发送数据)

## 相关背景

> Node.js采用谷歌的V8引擎，是一个服务器端的、非阻塞式I/O的、事件驱动的**JavaScript运行环境**

> 可以说Node.js的诞生很大程度上归功于v8引擎的出现.

我们都知道计算机处理器智能识别机器语言，而JavaScript是一门高级语言，计算机并不能直接读懂。所以我们需要所谓的引擎来将其转化成计算机所能理解的语言。
v8引擎是由Google推出的，为其浏览器Chrome所设计的开源JavaScript引擎。
得益于JIT，编译模式的改变与编译阶段的优化，JavaScript的性能得到了一个飞跃。其源代码是用c++写的，
除了对JavaScript性能的大幅提升，v8引擎也提供了“嵌入”的功能，使得开发者也可以在自己的c++程序中使用“嵌入”的v8引擎，从而高效地编译JavaScript，并加入c++的feature。要知道，作为一个底层得多的语言，c++可以实现的feature可要比JavaScript多得多。举例说明，JavaScript本身并没有read这么一个function。然而通过v8，我们可以将其绑定到一个用c++写的read callback上，从而通过JavaScript我们也可以直接加载文件了

非阻塞，事件驱动啥意思：

浏览器给网站发请求的过程一直没怎么变过：
当浏览器给网站发了请求。服务器收到了请求，然后开始搜寻被请求的资源。如果有需要，服务器还会查询一下数据库，最后把响应结果传回浏览器。
不过，在传统的web服务器中（比如Apache），每一个请求都会让服务器创建一个新的进程来处理这个请求。

后来有了Ajax：
有了Ajax，我们就不用每次都请求一个完整的新页面了，
取而代之的是，每次只请求需要的部分页面信息就可以了。
这显然是一个进步。但是比如你要建一个FriendFeed这样的社交网站（类似人人网那样的刷朋友新鲜事的网站），你的好友会随时的推送新的状态，然后你的新鲜事会实时自动刷新。要达成这个需求，我们需要让用户一直与服务器保持一个有效连接。目前最简单的实现方法，就是让用户和服务器之间保持长轮询（long polling）。

HTTP请求不是持续的连接，你请求一次，服务器响应一次，然后就完了。
长轮训是一种利用HTTP模拟持续连接的技巧。具体来说，只要页面载入了，不管你需不需要服务器给你响应信息，你都会给服务器发一个Ajax请求。这个请求不同于一般的Ajax请求，服务器不会直接给你返回信息，而是它要等着，直到服务器觉得该给你发信息了，它才会响应。比如，你的好友发了一条新鲜事，服务器就会把这个新鲜事当做响应发给你的浏览器，然后你的浏览器就刷新页面了。浏览器收到响应刷新完之后，再发送一条新的请求给服务器，这个请求依然不会立即被响应。于是就开始重复以上步骤。利用这个方法，可以让浏览器始终保持等待响应的状态。虽然以上过程依然只有非持续的Http参与，但是我们模拟出了一个看似持续的连接状态

我们再看传统的服务器（比如Apache）:
每次一个新用户连到你的网站上，你的服务器就得开一个连接。每个连接都需要占一个进程，这些进程大部分时间都是闲着的（比如等着你好友发新鲜事，等好友发完才给用户响应信息。或者等着数据库返回查询结果什么的）。虽然这些进程闲着，但是照样占用内存。这意味着，如果用户连接数的增长到一定规模，你服务器没准就要耗光内存直接瘫了。

这种情况怎么解决？解决方法就是刚才上边说的：**非阻塞**和**事件驱动**

### 非阻塞

这些概念在我们谈的这个情景里面其实没那么难理解。你把非阻塞的服务器想象成一个loop循环，这个loop会一直跑下去。一个新请求来了，这个loop就接了这个请求，把这个请求传给其他的进程（比如传给一个搞数据库查询的进程），然后响应一个回调（callback）。完事了这loop就接着跑，接其他的请求。这样下来。服务器就不会像之前那样傻等着数据库返回结果了。

### 事件驱动

如果数据库把结果返回来了，loop就把结果传回用户的浏览器，接着继续跑。在这种方式下，你的服务器的进程就不会闲着等着。从而在理论上说，同一时刻的数据库查询数量，以及用户的请求数量就没有限制了。服务器只在用户那边有事件发生的时候才响应，这就是事件驱动。

[Node.js是用来做什么的](https://www.zhihu.com/question/33578075)

[理解阻塞非阻塞与同步异步的区别](https://www.zhihu.com/question/19732473/answer/20851256)

## npm

npm 可以自动管理包的依赖. 只需要安装你想要的包, 不必考虑这个包的依赖包.

Node.js中，对应就是 npm，npm 是 Node.js Package Manager 的意思.

[express](https://www.expressjs.com.cn/)

[CNode 社区](https://cnodejs.org/)

## node重要对象

* global: 唯一全局对象，对标window环境中的window
* process: 代表当前Node.js进程

很多JavaScript代码既能在浏览器中执行，也能在Node环境执行, 如何判断JavaScript执行环境?

``` js
if (typeof(window) === 'undefined') {
    console.log('node.js');
} else {
    console.log('browser');
}
```

## 模块

### commonJS规范

``` js
// hello.js 模块
var s = 'Hello';

function greet(name) {
    console.log(s + ', ' + name + '!');
}

module.exports = greet;

// app.js
// 引入hello模块:
var greet = require('./hello');
var s = 'Michael';
greet(s); // Hello, Michael!
```

## 事件

``` js
// var events = require('events');
// var myEmitter = new events.EventEmitter();
// myEmitter.on('someEvent', function(msg) {
//     console.log(msg);
// })
// myEmitter.emit('someEvent', 'hello panda')

var events = require('events');
var util = require('util');

var Person = function(name) {
    this.name = name;
}
util.inherits(Person, events.EventEmitter); // 继承events.EventEmitter

var xiaomin = new Person('xiaomin');
var panda = new Person('panda');
var persons = [xiaomin, panda];

persons.forEach(function(person) {
    person.on('speak', function(msg) {
        console.log(person.name + ' said: ' + msg)
    })
})
xiaomin.emit('speak', 'i am xiaomin');
panda.emit('speak', 'i am panda');
```

## 文件读写

``` js
var fs = require('fs');

// 同步读取执行
var readMe = fs.readFileSync('readMe.txt', 'utf8');

// 异步读取执行
var readMe = fs.readFile('readMe.txt', 'utf8', function(err, data) {
    console.log(data);
});

// 写入 writeFileSync || writeFile
// 获取文件大小，创建时间等信息：stat || statSync
fs.stat('sample.txt', function(err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});

console.log('finished')
```

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行

## 创建和删除文件目录

``` js
var fs = require('fs');

fs.mkdir('stuff', function() {
    fs.readFile('readMe.txt', 'utf-8', function(err, data) {
        fs.writeFile('./stuff/demo.txt', data, function() {
            console.log('copy success');
        })
    })
})
// // 删除某一个文件
// fs.unlink('readMe.txt', function() {
//     console.log('done')
// })
```

## 流和管道

### stream: 以流的形式读取

``` js
// stream: 以流的形式读取
var fs = require('fs');
// 打开一个流:
var rs = fs.createReadStream('sample.txt', 'utf-8');
rs.on('data', function(chunk) {
    console.log('DATA:')
    console.log(chunk);
});
rs.on('end', function() {
    console.log('END');
});
rs.on('error', function(err) {
    console.log('ERROR: ' + err);
});
```

### 以流的形式写入

``` js
var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();
```

### pipe: 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe

``` js
var fs = require('fs');
var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');
rs.pipe(ws);
```

## http

### 响应一个纯文本

``` js
var http = require('http');

var onRequest = function(request, response) {
    console.log('Request received');
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end('Hello from panda world');
}
var server = http.createServer(onRequest)
server.listen(3000, '127.0.0.1');

console.log('Server started on localhost port 3000');
```

### 响应json

``` js
response.writeHead(200, {
    'Content-Type': 'application/json'
});
var jsonObj = {
    name: 'panda',
    age: 27,
    gender: 'man'
}
response.end(JSON.stringify(jsonObj));
```

### 响应html

``` js
var http = require('http');
var fs = require('fs');

var onRequest = function(request, response) {
    console.log('Request received');
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf-8');
    myReadStream.pipe(response);
}
var server = http.createServer(onRequest)
server.listen(3000, '127.0.0.1');

console.log('Server started on localhost port 3000');
```

## 用模块化思维组织代码

``` js
// server.js
var http = require('http');
var fs = require('fs');

function startServer() {
    var onRequest = function(request, response) {
        console.log('Request received');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf-8');
        myReadStream.pipe(response);
    }
    var server = http.createServer(onRequest)
    server.listen(3000, '127.0.0.1');

    console.log('Server started on localhost port 3000');
}

module.exports = {
    startServer: startServer
}
// app.js
var server = require('./server.js');
server.startServer();
```

## 路由

``` js
// server.js
var http = require('http');
var fs = require('fs');

function startServer(route, handle) {
    var onRequest = function(request, response) {
        console.log('Request received' + request.url); //通过request.url 来区分，现在目前比较粗糙
        route(handle, request.url, response)
        // if (request.url === '/' || request.url === '/home') {
        //     response.writeHead(200, {'Content-Type': 'text/html'});
        //     fs.createReadStream(__dirname + '/index.html', 'utf-8').pipe(response);
        // } else if (***) {
        //     ***
        // } else (***) {
        //     ***
        // }
    }
    var server = http.createServer(onRequest)
    server.listen(3000, '127.0.0.1');

    console.log('Server started on localhost port 3000');
}

module.exports = {
    startServer: startServer
}

// router.js
var fs = require('fs');

function route(handle, path, response) {
    if (typeof handle[path] === 'function') {
        handle[path](response);
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(__dirname + '/404.html', 'utf-8').pipe(response);
    }
}

module.exports = {
    route: route
}

// hander.js
var fs = require('fs');

function home(response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.createReadStream(__dirname + '/index.html', 'utf-8').pipe(response);
}

function review(response) {
    **
    **
}

function api_records(response) {
    **
    **
}

module.exports = {
    home: home,
    review: review,
    api_records: api_records
}

// app.js
var server = require('./server.js');
var router = require('./router.js');
var hander = require('./hander.js');

var handle = {};
handle['/'] = hander.home;
handle['/home'] = hander.home;
handle['/review'] = hander.review;
handle['/api/v1/records'] = hander.api_records;

server.startServer(router.route, handle);
```

## 使用get和post发送数据

``` js
// server.js
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

function startServer(route, handle) {
    var onRequest = function(request, response) {
        var pathName = url.parse(request.url).pathname; // 通过此方法只是获取path 例如： /api/vi/records?a=b只是获取/api/vi/records
        console.log('Request received' + pathName);
        var data = '';
        request.on('err', function(err) {
            console.error(err);
        }).on('data', function(chunk) {
            data += chunk;
        }).on('end', function() {
            if (request.method === 'POST') {
                // post处理
                route(handle, pathName, response, querystring.parse(data));
            } else {
                // get处理
                var params = url.parse(request.url, true).query; // 获取链接后面get参数
                route(handle, pathName, response, params)
            }

        })

    }
    var server = http.createServer(onRequest)
    server.listen(3000, '127.0.0.1');

    console.log('Server started on localhost port 3000');
}

module.exports = {
    startServer: startServer
}
```
