/*
小良 - 更新器 2.4
 2018.10.12
·修复jsbox不能安装脚本问题。
·修复workflow规则安装问题。

by：iPhone 8、小良
http://ae85.cn/
*/

const pz = {
    title: "小良 - 更新器 2.4",
    pin: "pin://install?url=",
    anzsb: "安装失败！\n请检查你的网络是否正常",
    banqsm:
        "- 感谢支持 - ae85.cn -\n唯一官方正版、未经允许请勿转载\n版权所有 iPhone 8、小良 ©2016~2018"
};

const menu = {
    type: "menu",
    props: {
        id: "Menu",
        items: ["推荐", "脚本", "规则", "教程", "应用", "解析"]
    },
    layout: function (make) {
        make.left.bottom.right.equalTo(0);
        make.height.equalTo(40);
    },
    events: {
        changed: function (sender) {
            var index = sender.index;
            $delay(0.1, function () {
                if (index == 0) {
                    csh();
                    render();
                } else {
                    zxgetlist(index);
                }
            });
        }
    }
};

const fgx = {
    type: "view",
    props: {
        id: "fy",
        bgcolor: $color("#838b8b")
    },
    layout: function (make) {
        make.left.right.equalTo(0);
        make.bottom.equalTo($("Menu").top);
        make.height.equalTo(0.75);
        make.width.equalTo($device.info.screen.width);
    }
};
const mrhb = {
    type: "button",
    props: {
        id: "hb_img",
        radius: 30,
        src: "http://ae85.cn/wf/hb.jpg"
    },
    events: {
        tapped: function (sender) {
            $app.openURL(
                "alipays://platformapi/startapp?appId=20000067&__open_alipay__=YES&url=https%3A%2F%2Frender.alipay.com%2Fp%2Ff%2Ffd-j6lzqrgm%2Fguiderofmklvtvw.html%3Fchannel%3DqrCode%26shareId%3D2088202699097532%26sign%3DAFml1OwpzCQC4IVlQHEDQ0LKkXiaDFyESl0GCk43ahU%253D%26scene%3DofflinePaymentNewSns%26campStr%3Dp1j%252BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL%26token%3Dc1x08164vrc0u6jhg7oslac"
            );
        }
    },
    layout: function (make, view) {
        make.bottom.inset(66);
        make.width.height.equalTo(60);
        make.right.inset(15);
    }
};
const vlist = {
    type: "list",
    props: {
        id: "vlist",
        rowHeight: 200,
        template: [
            {
                type: "label",
                props: {
                    id: "lmc",
                    font: $font("bold", 21),
                    lines: 0
                },
                layout: function (make, view) {
                    make.left.right.inset(10);
                    make.top.inset(5);
                }
            },
            {
                type: "label",
                props: {
                    id: "xsqb",
                    text: "显示全部 〉",
                    font: $font(16),
                    textColor: $color("#848484")
                },
                layout: function (make) {
                    make.top.inset(5);
                    make.right.inset(0);
                    make.width.equalTo(90);
                    make.height.equalTo(35);
                }
            },
            {
                type: "matrix",
                props: {
                    id: "cd",
                    itemHeight: 80,
                    columns: 4,
                    spacing: 5,
                    template: [
                        {
                            type: "image",
                            props: {
                                id: "img",
                                radius: 16
                            },
                            layout: function (make, view) {
                                make.top.inset(0);
                                make.centerX.equalTo(view.center);
                                make.height.width.equalTo(80);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "pm",
                                align: $align.center,
                                lines: 0,
                                font: $font("bold", 12)
                            },
                            layout: function (make, view) {
                                make.top.equalTo($("img").bottom).offset(5);
                                make.right.left.inset(5);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "rq",
                                align: $align.center,
                                lines: 1,
                                textColor: $color("#848484"),
                                font: $font("bold", 12)
                            },
                            layout: function (make, view) {
                                make.top.equalTo($("pm").bottom).offset(5);
                                make.right.left.inset(5);
                            }
                        }
                    ]
                },
                layout: function (make) {
                    make.top.equalTo($("lmc").bottom).inset(10);
                    make.left.right.inset(0);
                    make.height.equalTo(155);
                },
                events: {
                    didSelect: function (sender, indexPath, data) {
                        xqym(data.data);
                    }
                }
            }
        ]
    },
    layout: function (make, view) {
        make.width.equalTo(view.super);
        make.left.inset(0);
        make.top.equalTo($("gall").bottom).inset(5);
        make.height.equalTo(975);
    },
    events: {
        didSelect: function (sender, indexPath, data) {
            zxgetlist(data.id);
        }
    }
};

var urlt = "http://ae85.cn/";

function refetch() {
    $ui.loading(true);
    $http.get({
        url:
            $text.base64Decode(
                "aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyLw=="
            ) + "pin.json",
        handler: function (resp) {
            $ui.loading(false);
            var data = resp.data;
            if (data.version != "2.4") {
                $ui.alert({
                    title: "发现新版本",
                    message: resp.data.hant,
                    actions: [
                        {
                            title: "立即更新",
                            handler: function () {
                                azjs(data.bburl);
                            }
                        },
                        {
                            title: "访问官网",
                            handler: function () {
                                $app.openURL(urlt);
                            }
                        }
                    ]
                });
            } else {
                csh();
                $cache.set("stories", resp.data);
                render();
                tcgg(resp.data.js.gg);
            }
        }
    });
}

function tcgg(gg) {
    if ($file.exists("gg.txt")) {
        var file = $file.read("gg.txt").string;
        $console.info(file);
        if (file != gg) {
            xrwj(gg);
        }
    } else {
        xrwj(gg);
    }
}

function xrwj(nr) {
    $ui.alert(nr);
    $file.write({
        data: $data({ string: nr }),
        path: "gg.txt"
    });
}

function zxgetlist(id) {
    var json = $cache.get("stories").data;
    if (id == 1) {
        listjm("脚本列表", "⁺ 获取 ");
        $("Menu").index = 1;
        getlist(json.jb);
    } else if (id == 2) {
        listjm("规则列表", "⁺ 获取 ");
        $("Menu").index = 2;
        getlist(json.gz);
    } else if (id == 3) {
        listjm("教程列表", "⁺ 观看 ");
        $("Menu").index = 3;
        getlist(json.jc);
    } else if (id == 4) {
        listjm("应用列表", "⁺ 安装 ");
        $("Menu").index = 4;
        getlist(json.yy);
    } else if (id == 5) {
        listjm("解析列表", "⁺ 查看 ");
        $("Menu").index = 5;
        getlist(json.jx);
    } else if (id == 6) {
        listjm("关于作者", "⁺ 点赞 ");
        $("Menu").index = 5;
        getlist(json.qt);
    }
}

refetch();

var gdggn = [dt(0), dt(1), dt(2), dt(3), dt(4)];

function dt(a) {
    var data = $cache.get("stories").js.zygd;
    var gd = data[a];
    var tad = {
        type: "button",
        props: {
            src: urlt + gd.src
        },
        events: {
            tapped: function (sender) {
                web(gd.url, gd.name);
            }
        }
    };
    return tad;
}

function azjs(jsurl) {
    var appid = $app.info.bundleID;
    var appbb = $app.info.version;
    var txt = jsurl.split("&name=");
    var url = txt[0];
    var name = decodeURI(txt[1]);
    if (appid == "app.cyan.pin") {
        if ((appbb == "3.2.2") | (appbb == "3.2.3")) {
            $ui.toast("正在安装中 ...");
            $app.openURL(pz.pin + jsurl);
        } else {
            $ui.alert({
                title: "温馨提示:",
                message:
                    "您的Pin版本不支持直接导入\n你还可以选择以下方式添加\n\n1.分享模式可以将js文件分享到微信或其它App或备忘录后再导入到Pin\n\n2.复制代码模式:在pin新建一个空白脚本将复制后的代码粘贴到代码区保存即可\n\n如果不会操作请看视频教程",
                actions: [
                    {
                        title: "分享文件模式添加",
                        handler: function () {
                            $ui.toast("正在下载中 ...");
                            $ui.loading(true);
                            $http.download({
                                url: url,
                                handler: function (resp) {
                                    $ui.loading(false);
                                    if (resp.response.statusCode == "200") {
                                        $share.sheet([name + ".js", resp.data]);
                                    } else {
                                        $ui.alert(pz.anzsb);
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "复制代码模式添加",
                        handler: function () {
                            $ui.loading(true);
                            $http.get({
                                url: url,
                                handler: function (resp) {
                                    $ui.loading(false);

                                    if (resp.response.statusCode == "200") {
                                        $clipboard.text = resp.data;
                                        $ui.alert("js脚本代码已复制\n\n新建扩展脚本粘贴即可");
                                    } else {
                                        $ui.alert(pz.anzsb);
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "观看添加视频教程",
                        handler: function () {
                            $app.openURL("http://t.cn/RDIca0w");
                        }
                    },
                    {
                        title: "取消"
                    }
                ]
            });
        }
    } else if (appid == "app.cyan.jsbox") {
        $ui.toast("正在安装中 ...");
        $http.download({
            url: url,
            handler: function (resp) {
                $addin.save({
                    name: name,
                    data: resp.data,
                    handler: function () {
                        $ui.alert({
                            title: "安装完成",
                            message: "\n是否打开？\n" + name,
                            actions: [
                                {
                                    title: "打开",
                                    handler: function () {
                                        $app.openExtension(name)
                                    }
                                },
                                {
                                    title: "不了"
                                }]
                        });
                    }
                })
            }
        })
    }
}

function render() {
    var json = $cache.get("stories").data;
    $("vlist").data = [
        clzyli(json.jb, "脚本", "1"),
        clzyli(json.gz, "规则", "2"),
        clzyli(json.jc, "教程", "3"),
        clzyli(json.yy, "应用", "4"),
        clzyli(json.jx, "解析", "5"),
        clzyli(json.qt, "关于作者", "6")
    ];
}

function clzyli(json, mc, idx) {
    var data = [];
    for (i in json) {
        if (i < 4) {
            data.push({
                img: { src: urlt + json[i].image },
                pm: { text: json[i].title },
                rq: { text: json[i].rq },
                data: json[i]
            });
        }
    }
    var txt = {
        lmc: { text: mc },
        cd: { data: data },
        id: idx
    };
    return txt;
}

function csh() {
    $ui.render({
        props: {
            title: pz.title
        },
        views: [
            menu,
            fgx,
            {
                type: "scroll",
                layout: function (make, view) {
                    make.top.left.right.inset(0);
                    make.bottom.equalTo($("fy").top);
                },
                views: [
                    {
                        type: "gallery",
                        props: {
                            id: "gall",
                            items: gdggn,
                            interval: 3
                        },
                        layout: function (make, view) {
                            make.height.equalTo(160);
                            make.width.equalTo(view.super);
                            make.top.left.inset(0);
                        }
                    },
                    vlist,
                    {
                        type: "label",
                        props: {
                            align: $align.center,
                            font: $font(14),
                            textColor: $color("blue"),
                            text: pz.banqsm,
                            lines: 0
                        },
                        layout: function (make, view) {
                            make.width.equalTo(view.super);
                            make.left.inset(0);
                            make.top.equalTo($("vlist").bottom).inset(5);
                            make.height.equalTo(75);
                        }
                    }
                ]
            },
            mrhb
        ]
    });
}

function getlist(json) {
    var data = [];
    for (var idx in json) {
        var story = json[idx];
        data.push({
            lt: {
                src: urlt + story.image
            },
            mc: {
                text: story.title
            },
            sm: {
                text: story.details
            },
            hhq: {
                data: [{ url: story.url, title: story.title }]
            },
            rq: {
                text: story.rq
            },
            data: story
        });
    }
    $("list").data = data;
    $("list").endRefreshing();
}

function listjm(bt, ant) {
    $ui.render({
        props: {
            title: bt
        },
        views: [
            menu,
            fgx,
            {
                type: "list",
                props: {
                    rowHeight: 95,
                    template: [
                        {
                            type: "image",
                            props: {
                                id: "lt",
                                radius: 7,
                                bgcolor: $color("white")
                            },
                            layout: function (make, view) {
                                make.left.top.bottom.inset(10);
                                make.width.equalTo(view.height);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "mc",
                                font: $font("bold", 17),
                                lines: 0
                            },
                            layout: function (make, view) {
                                make.left.equalTo($("lt").right).offset(10);
                                make.top.inset(13);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "rq",
                                font: $font(15),
                                textColor: $color("blue")
                            },
                            layout: function (make) {
                                make.left.equalTo($("mc"));
                                make.top.equalTo($("mc").bottom).inset(5);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "sm",
                                font: $font(15),
                                textColor: $color("gray")
                            },
                            layout: function (make) {
                                make.left.equalTo($("rq"));
                                make.top.equalTo($("rq").bottom).inset(5);
                            }
                        },
                        {
                            type: "matrix",
                            props: {
                                id: "hhq",
                                itemHeight: 30,
                                columns: 1,
                                spacing: 0,
                                template: [
                                    {
                                        type: "label",
                                        props: {
                                            id: "hq",
                                            text: ant,
                                            radius: 5,
                                            textColor: $color("blue"),
                                            borderColor: $color("blue"),
                                            borderWidth: 1,
                                            align: $align.center,
                                            font: $font(15)
                                        },
                                        layout: $layout.fill
                                    }
                                ]
                            },
                            layout: function (make) {
                                make.top.inset(32);
                                make.size.equalTo($size(50, 30));
                                make.right.inset(10);
                            },
                            events: {
                                didSelect: function (sender, indexPath, data) {
                                    if (data.url.indexOf(".js&name=") !== -1) {
                                        azjs(data.url);
                                    } else {
                                        if (data.url.indexOf("://") == -1) {
                                            installgz(data.url)
                                        } else {
                                            $app.openURL(data.url);
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                layout: function (make) {
                    make.top.equalTo(0);
                    make.bottom.equalTo($("fy").top);
                    make.right.left.inset(0);
                },
                events: {
                    didSelect: function (sender, indexPath, data) {
                        xqym(data.data);
                    }
                }
            },
            mrhb
        ]
    });
}

function xqym(data) {
    $ui.push({
        props: {
            title: pz.title
        },
        views: [
            menu,
            fgx,
            {
                type: "image",
                props: {
                    id: "icon",
                    src: urlt + data.image,
                    radius: 7,
                    bgcolor: $color("white")
                },
                layout: function (make, view) {
                    make.left.top.inset(5);
                    make.width.height.equalTo(100);
                }
            },
            {
                type: "label",
                props: {
                    id: "biao",
                    text: data.title,
                    font: $font("bold", 21),
                    lines: 0
                },
                layout: function (make, view) {
                    make.left.equalTo($("icon").right).offset(10);
                    make.top.inset(10);
                }
            },
            {
                type: "label",
                props: {
                    id: "biaorq",
                    text: data.rq,
                    font: $font(15),
                    textColor: $color("blue"),
                    lines: 0
                },
                layout: function (make, view) {
                    make.left.equalTo($("icon").right).offset(10);
                    make.top.equalTo($("biao").bottom).inset(10);
                }
            },
            {
                type: "label",
                props: {
                    id: "biaozz",
                    text: " iPhone 8、小良 ",
                    font: $font(15),
                    radius: 7,
                    textColor: $color("#777777"),
                    bgcolor: $color("#F5F5F5"),
                    lines: 0
                },
                layout: function (make, view) {
                    make.left.equalTo($("icon").right).offset(10);
                    make.top.equalTo($("biaorq").bottom).inset(10);
                }
            },
            {
                type: "button",
                props: {
                    id: "bt1",
                    title: data.button,
                    font: $font(16),
                    titleColor: $color("blue"),
                    bgcolor: $color("clear"),
                    borderColor: $color("blue"),
                    borderWidth: 1
                },
                layout: function (make) {
                    make.bottom.equalTo($("icon").bottom);
                    make.right.inset(5);
                    make.size.equalTo($size(100, 32));
                },
                events: {
                    tapped: function (sender) {
                        if (data.url.indexOf(".js&name=") !== -1) {
                            azjs(data.url);
                        } else {
                            if (data.url.indexOf("://") == -1) {
                                installgz(data.url)
                            } else {
                                $app.openURL(data.url);
                            }
                        }
                    },
                    longPressed: function (sender) {
                        //暂时取消长按功能
                    }
                }
            },
            {
                type: "tab",
                props: {
                    items: ["详情", "教程"],
                    index: 0
                },
                layout: function (make) {
                    make.left.right.inset(30);
                    make.top.equalTo($("icon").bottom).offset(10);
                    make.height.equalTo(28);
                },
                events: {
                    changed: function (sender) {
                        if (sender.index == 0) {
                            $("smbq").alpha = 1;
                            $("web").alpha = 0;
                        } else {
                            $("smbq").alpha = 0;
                            $("web").alpha = 1;
                        }
                    }
                }
            },
            {
                type: "view",
                props: {
                    id: "fh",
                    bgcolor: $color("#838b8b")
                },
                layout: function (make) {
                    make.left.equalTo(0);
                    make.top.equalTo($("tab").bottom).offset(5);
                    make.height.equalTo(0.75);
                    make.width.equalTo($device.info.screen.width);
                }
            },
            {
                type: "text",
                props: {
                    id: "smbq",
                    text: data.details,
                    editable: false,
                    radius: 7,
                    font: $font("Avenir-Light", 17)
                },
                layout: function (make) {
                    make.right.left.inset(5);
                    make.top.equalTo($("fh").bottom).offset(10);
                    make.bottom.equalTo($("fy").top).inset(1);
                }
            },
            {
                type: "web",
                props: {
                    url: data.jsurl,
                    alpha: 0,
                    radius: 7
                },
                layout: function (make, view) {
                    make.left.right.inset(1);
                    make.top.equalTo($("fh").bottom).offset(1);
                    make.bottom.equalTo($("fy").top).inset(1);
                }
            },
            mrhb
        ]
    });
}

function web(url, mc) {
    $ui.push({
        props: {
            title: mc
        },
        views: [
            menu,
            fgx,
            {
                type: "web",
                props: {
                    url: url
                },
                layout: function (make, view) {
                    make.top.left.right.inset(0);
                    make.bottom.equalTo($("fy").top).inset(1);
                }
            },
            mrhb
        ]
    });
}

function installgz(id) {
    $ui.toast("正在处理中 ...");
    if ($device.info.version.split(".")[0] < 12) {
        $http.get({
            url: "https://www.icloud.com/shortcuts/api/records/" + id,
            handler: function (resp) {
                var durl = resp.data.fields.icon.value.downloadURL
                var name = resp.data.fields.name.value
                $http.post({
                    url: "http://web.chacuo.net/charseturlencode",
                    header: {
                        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Mobile Safari/537.36"
                    },
                    body: {
                        data: durl,
                        type: "urlencode",
                        arg: "s=utf-8_j=1_t=0"
                    },
                    handler: function (resp) {
                        var data = resp.data;
                        data = JSON.stringify(data)
                        var eurl = data.data
                        var url = "workflow://import-workflow/?url=" + eurl + "&name=" + $text.URLEncode(name)
                        $app.openURL(url);
                    }
                });
            }
        });
    } else {
        $app.openURL("https://www.icloud.com/shortcuts/" + id);
    }
}