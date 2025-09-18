// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有页面可能需要的功能
    initCommonFunctions();
    
    // 检查是否是主页，如果是则初始化主页功能
    if (document.getElementById('device-modal')) {
        initHomePage();
    }
    
    // 检查是否有按钮导航，如果有则初始化按钮导航功能
    if (document.querySelectorAll('.button-wrapper').length > 0 || 
        document.querySelectorAll('.feature-button').length > 0) {
        initButtonNavigation();
    }
});

// 公共功能初始化函数（所有页面都可能用到的功能）
function initCommonFunctions() {
    // 这里可以添加所有页面都需要的公共功能
    console.log('公共功能已初始化');
}

// 主页初始化函数（仅在主页加载时执行）
function initHomePage() {
    try {
        // 获取DOM元素
        const modal = document.getElementById('device-modal');
        const confirmMobileBtn = document.getElementById('confirm-mobile');
        const switchDesktopBtn = document.getElementById('switch-desktop');
        const mainContent = document.getElementById('main-content');
        const desktopImageContainer = document.querySelector('.hero-image-container-desktop');
        
        // 检测是否是移动设备
        function isMobileDevice() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
        
        // 检查URL参数，如果是从功能页面返回，则直接显示对应的主页
        console.log('=== 开始处理URL参数 ===');
        console.log('当前URL:', window.location.href);
        const urlParams = new URLSearchParams(window.location.search);
        console.log('URL参数列表:');
        for (const [key, value] of urlParams.entries()) {
            console.log(`  ${key}: ${value}`);
        }
        
        // 检查是否存在desktop=true参数
        console.log('检查是否存在desktop=true参数...');
        console.log('has(desktop):', urlParams.has('desktop'));
        if (urlParams.has('desktop')) {
            console.log('get(desktop):', urlParams.get('desktop'));
            console.log('get(desktop) === true:', urlParams.get('desktop') === 'true');
        }
        
        // 增强desktop=true参数处理逻辑，确保无论参数值如何（只要存在）都显示电脑端主页
        // 这是一个更安全的处理方式，可以避免参数值比较可能带来的问题
        if (urlParams.has('desktop')) {
            // 无论参数值是什么，只要存在desktop参数，就认为是要访问电脑端主页
            console.log('✅ 检测到desktop参数，直接显示电脑端主页');
            
            console.log('尝试隐藏弹窗...');
            if (modal) {
                console.log('modal元素存在，设置display:none');
                modal.style.display = 'none';
                // 添加更严格的隐藏方式
                modal.style.visibility = 'hidden';
                modal.style.opacity = '0';
            } else {
                console.log('警告: modal元素不存在');
            }
            
            console.log('尝试显示主内容...');
            if (mainContent) {
                console.log('mainContent元素存在，移除hidden类');
                mainContent.classList.remove('hidden');
                // 确保主内容可见
                mainContent.style.display = 'block';
            } else {
                console.log('警告: mainContent元素不存在');
            }
            
            if (desktopImageContainer) {
                console.log('desktopImageContainer元素存在，移除hidden类');
                desktopImageContainer.classList.remove('hidden');
                // 确保电脑端图片容器可见
                desktopImageContainer.style.display = 'block';
            }
            
            console.log('尝试设置电脑端视图类...');
            console.log('当前body类:', document.body.className);
            document.body.classList.add('force-desktop-view');
            document.body.classList.remove('force-mobile-view');
            console.log('更新后body类:', document.body.className);
            
            // 添加额外的CSS类来明确标识电脑端视图
            document.documentElement.classList.add('desktop-view-active');
            
            console.log('=== URL参数处理完成，已直接显示电脑端主页 ===');
            return; // 跳过后续的弹窗逻辑
        }
        
        // 检查是否存在mobile=true参数
        console.log('检查是否存在mobile=true参数...');
        console.log('has(mobile):', urlParams.has('mobile'));
        if (urlParams.has('mobile')) {
            console.log('get(mobile):', urlParams.get('mobile'));
            console.log('get(mobile) === true:', urlParams.get('mobile') === 'true');
        }
        
        if (urlParams.has('mobile') && urlParams.get('mobile') === 'true') {
            console.log('✅ 检测到mobile=true参数，直接显示手机端主页');
            
            console.log('尝试隐藏弹窗...');
            if (modal) {
                console.log('modal元素存在，设置display:none');
                modal.style.display = 'none';
            } else {
                console.log('警告: modal元素不存在');
            }
            
            console.log('尝试显示主内容...');
            if (mainContent) {
                console.log('mainContent元素存在，移除hidden类');
                mainContent.classList.remove('hidden');
            } else {
                console.log('警告: mainContent元素不存在');
            }
            
            console.log('尝试设置手机端视图类...');
            console.log('当前body类:', document.body.className);
            document.body.classList.add('force-mobile-view');
            document.body.classList.remove('force-desktop-view');
            console.log('更新后body类:', document.body.className);
            
            console.log('=== URL参数处理完成，已直接显示手机端主页 ===');
            return; // 跳过后续的弹窗逻辑
        } else {
            console.log('❌ 未检测到有效的desktop=true或mobile=true参数，继续显示设备选择弹窗');
        }
        
        // 强制在所有设备上都显示弹窗
        if (modal) {
            modal.style.display = 'flex';
        }
        
        // 确认手机端用户按钮点击事件
        if (confirmMobileBtn && modal && mainContent) {
            confirmMobileBtn.addEventListener('click', function() {
                if (modal) modal.style.display = 'none';
                if (mainContent) mainContent.classList.remove('hidden');
                document.body.classList.add('force-mobile-view');
                document.body.classList.remove('force-desktop-view');
                console.log('用户确认使用手机端访问');
            });
        }
        
        // 跳转到电脑版按钮点击事件
        if (switchDesktopBtn && modal && mainContent) {
            switchDesktopBtn.addEventListener('click', function() {
                if (modal) modal.style.display = 'none';
                if (mainContent) mainContent.classList.remove('hidden');
                if (desktopImageContainer) {
                    desktopImageContainer.classList.remove('hidden');
                }
                document.body.classList.add('force-desktop-view');
                document.body.classList.remove('force-mobile-view');
                console.log('用户选择查看电脑版内容');
            });
        }
        
        // 键盘Esc键关闭弹窗功能
        if (modal && confirmMobileBtn) {
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && modal.style.display !== 'none') {
                    confirmMobileBtn.click();
                }
            });
        }
        
        // 点击弹窗外部区域关闭弹窗功能
        if (modal && confirmMobileBtn) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    confirmMobileBtn.click();
                }
            });
        }
        
        console.log('主页功能已初始化');
    } catch (error) {
        console.error('初始化主页功能时出错:', error);
    }
}

// 按钮导航初始化函数
function initButtonNavigation() {
    try {
        // 为按钮框添加点击事件
        const buttonWrappers = document.querySelectorAll('.button-wrapper');
        
        if (buttonWrappers.length > 0) {
            buttonWrappers.forEach((wrapper, index) => {
                wrapper.addEventListener('click', function() {
                    try {
                        console.log(`用户点击了功能${index + 1}按钮框`);
                        
                        // 添加交互反馈效果
                        wrapper.style.transform = 'scale(0.98)';
                        
                        // 延迟执行跳转
                        setTimeout(() => {
                            wrapper.style.transform = 'scale(1)';
                            
                            // 判断视图类型
                            const isMobileView = document.body.classList.contains('force-mobile-view');
                            
                            // 设置目标URL
                            const buttonIndex = index + 1;
                            const targetUrl = isMobileView ? 
                                `feature${buttonIndex}-mobile.html` : 
                                `feature${buttonIndex}-desktop.html`;
                            
                            console.log(`将跳转到: ${targetUrl}`);
                            window.location.href = targetUrl;
                        }, 150);
                    } catch (error) {
                        console.error('处理按钮框点击事件时出错:', error);
                    }
                });
            });
        }
        
        // 为功能按钮添加点击事件
        const featureButtons = document.querySelectorAll('.feature-button');
        
        if (featureButtons.length > 0) {
            featureButtons.forEach((button, index) => {
                button.addEventListener('click', function() {
                    try {
                        // 添加交互反馈效果
                        const wrapper = button.closest('.button-wrapper');
                        if (wrapper) {
                            wrapper.style.transform = 'scale(0.98)';
                        }
                        
                        // 延迟执行跳转
                        setTimeout(() => {
                            if (wrapper) {
                                wrapper.style.transform = 'scale(1)';
                            }
                            
                            // 判断视图类型
                            const isMobileView = document.body.classList.contains('force-mobile-view');
                            
                            // 设置目标URL
                            const buttonIndex = index + 1;
                            const targetUrl = isMobileView ? 
                                `feature${buttonIndex}-mobile.html` : 
                                `feature${buttonIndex}-desktop.html`;
                            
                            console.log(`将跳转到: ${targetUrl}`);
                            window.location.href = targetUrl;
                        }, 150);
                    } catch (error) {
                        console.error('处理功能按钮点击事件时出错:', error);
                    }
                });
            });
        }
        
        console.log('按钮导航功能已初始化');
    } catch (error) {
        console.error('初始化按钮导航功能时出错:', error);
    }
}