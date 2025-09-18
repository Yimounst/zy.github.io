// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('=== 功能页面脚本开始加载 ===');
        console.log('当前页面:', window.location.href);
        
        // 为返回按钮添加点击事件
        console.log('尝试获取返回按钮元素...');
        const backButton = document.querySelector('.back-button');
        
        if (backButton) {
            console.log('✅ 找到返回按钮元素');
            console.log('返回按钮内容:', backButton.textContent.trim());
            
            // 记录返回按钮的初始状态
            console.log('返回按钮初始样式:', { 
                backgroundColor: window.getComputedStyle(backButton).backgroundColor,
                className: backButton.className
            });
            
            backButton.addEventListener('click', function(event) {
                console.log('\n=== 返回按钮被点击 ===');
                console.log('点击事件:', event.type);
                
                // 阻止事件冒泡和默认行为（尽管这个按钮没有默认行为）
                event.preventDefault();
                event.stopPropagation();
                
                // 添加简单的交互反馈效果
                console.log('添加点击反馈效果，设置背景色为#e0e0e0');
                backButton.style.backgroundColor = '#e0e0e0';
                
                // 增强页面类型检测逻辑，更可靠地判断当前页面是电脑端还是手机端
                const currentUrl = window.location.href.toLowerCase();
                console.log('当前URL(小写):', currentUrl);
                
                // 使用多种方式检测是否为电脑端页面
                const hasDesktopInUrl = currentUrl.includes('desktop');
                const isNotMobilePage = !currentUrl.includes('mobile');
                const isLikelyDesktop = hasDesktopInUrl || (isNotMobilePage && currentUrl.includes('feature'));
                
                console.log('URL检测结果:');
                console.log('  hasDesktopInUrl:', hasDesktopInUrl);
                console.log('  isNotMobilePage:', isNotMobilePage);
                console.log('  isLikelyDesktop:', isLikelyDesktop);
                
                // 根据页面类型决定跳转到哪个主页
                const targetUrl = isLikelyDesktop ? 'index.html?desktop=true' : 'index.html?mobile=true';
                
                console.log(`准备在100ms后跳转到: ${targetUrl}`);
                setTimeout(() => {
                    console.log('执行跳转操作...');
                    console.log('即将跳转到:', targetUrl);
                    window.location.href = targetUrl;
                }, 100);
            });
        } else {
            console.error('❌ 未找到返回按钮元素，请检查HTML结构');
            console.log('当前页面所有按钮:', document.querySelectorAll('button'));
        }
        
        console.log('=== 功能页面脚本加载完成 ===');
    } catch (error) {
        console.error('加载功能页面脚本时出错:', error);
        console.error('错误堆栈:', error.stack);
    }
});