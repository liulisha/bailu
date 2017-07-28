class Main extends egret.DisplayObjectContainer {
    
    private times: number;//记录点击顺序

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if(event.groupName == "preload") {            
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if(event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {           
        //加入声音
        var sound: egret.Sound = RES.getRes("Timbaland&OneRepublic-Apologize_mp3");
        //其中的第一个参数 0 表示播放的开始时间，第二个参数表示播放次数，这里我们只播放一次，如果将第二个参数设置为负数将循环播放。
        var channel: egret.SoundChannel = sound.play(0,1);        
   
        //创造背景色
        var bg:egret.Shape=new egret.Shape();
        bg.graphics.beginFill(0xffffff,1);
        bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        bg.graphics.endFill(); 
        this.addChild(bg);
        
        //显示一个图片
        var batman1: egret.Bitmap = new egret.Bitmap(RES.getRes("ni_png_0119_png"));
        batman1.x = 50;
        batman1.y = 300;
        this.addChild(batman1);
        this.setChildIndex(batman1,2);
//        console.log(this.getChildIndex(batman1));
        
        //显示一个图片
        var batman2: egret.Bitmap = new egret.Bitmap(RES.getRes("ni_png_0120_png"));
        batman2.x = 120;
        batman2.y = 300;
        this.addChild(batman2);
        this.setChildIndex(batman2,1);
        //显示一个图片
        var batman3: egret.Bitmap = new egret.Bitmap(RES.getRes("ni_png_0121_png"));
        batman3.x = 200;
        batman3.y = 300;
        this.addChild(batman3);
        this.setChildIndex(batman3,4);
//        console.log(this.getChildIndex(batman3));
        
        //显示一个图片
        var batman4: egret.Bitmap = new egret.Bitmap(RES.getRes("ni_png_0122_png"));
        batman4.x = 270;
        batman4.y = 300;
        this.addChild(batman4);
        this.setChildIndex(batman4,3);
//        console.log(this.getChildIndex(batman4));
        

        this.times = -1;
        var self = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
            switch(++self.times % 3) {
                case 0: {
                    //交换位置
                    egret.Tween.get(batman1).to({ x: batman2.x },300,egret.Ease.circIn);
                    egret.Tween.get(batman2).to({ x: batman1.x },300,egret.Ease.circIn);
                    break;}
                case 1: { 
                    //设置为透明，再回复
                    egret.Tween.get(batman3).to({ alpha: .3 },300,egret.Ease.circIn).to({ alpha: 1 },300,egret.Ease.circIn);
                    break;}
                case 2: {        
                    //使缩小，再放大
                    egret.Tween.get(batman4).to({ scaleX: .4,scaleY: .4 },500,egret.Ease.circIn).to({ scaleX: 1,scaleY: 1 },500,egret.Ease.circIn);
                    break;}
            }
        },this);
        
        
        
       
        
      
        
        
//        //显示文字
//        var tx: egret.TextField = new egret.TextField();
//        tx.text = "I'm Jack, I will use Egret create a fantasy mobile game!";
//        tx.size = 32;
//        tx.x = 20;
//        tx.y = 20;
//        tx.width = this.stage.stageWidth - 40;
//        this.addChild(tx);
//        
//        //响应用户触摸操作
//        tx.touchEnabled = true;
//        tx.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
//        console.log("preload",RES.getRes("heroes-01") );

    }
    private touchHandler(evt: egret.TouchEvent): void {
        var tx: egret.TextField = evt.currentTarget;
        tx.textColor = 0x00ff00;
    }
   
}


