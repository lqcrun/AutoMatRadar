// 豆包API测试脚本 - 快速验证API是否正常工作
// 只测试3篇文章的摘要生成

const fetch = require('node-fetch');

// 从环境变量读取API Key
const DOUBAO_API_KEY = process.env.DOUBAO_API_KEY;

if (!DOUBAO_API_KEY) {
    console.error('❌ 错误：未设置 DOUBAO_API_KEY 环境变量');
    console.log('\n请先设置环境变量：');
    console.log('Windows: set DOUBAO_API_KEY=你的API-Key');
    console.log('Linux/Mac: export DOUBAO_API_KEY=你的API-Key');
    process.exit(1);
}

// 测试用的英文文章
const testArticles = [
    {
        title: 'Tesla Introduces New Battery Technology',
        description: 'Tesla has announced a breakthrough in battery technology that could increase electric vehicle range by 50%. The new lithium-ion batteries use advanced materials and manufacturing processes.'
    },
    {
        title: 'Aluminum Alloy Innovation for Automotive Industry',
        description: 'Researchers have developed a new aluminum alloy that is 30% lighter and 20% stronger than traditional materials, making it ideal for automotive applications.'
    },
    {
        title: 'Carbon Fiber Composite Materials Advance',
        description: 'New carbon fiber composite materials offer improved strength-to-weight ratios for vehicle manufacturing, potentially reducing fuel consumption by up to 15%.'
    }
];

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testDoubaoAPI(text, index) {
    console.log(`\n[${index + 1}/3] 测试中...`);
    console.log(`原文: ${text.substring(0, 100)}...`);

    try {
        const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DOUBAO_API_KEY}`
            },
            body: JSON.stringify({
                model: 'doubao-lite-4k',
                messages: [{
                    role: 'user',
                    content: `请将以下汽车材料技术文章翻译成中文并生成简短摘要（100字以内），只输出摘要内容：\n\n${text}`
                }],
                max_tokens: 200,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ API请求失败 (${response.status}): ${errorText}`);
            return null;
        }

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message) {
            const summary = data.choices[0].message.content.trim();
            console.log(`✅ 中文摘要: ${summary}`);
            return summary;
        } else {
            console.error('❌ API返回格式错误:', JSON.stringify(data).substring(0, 200));
            return null;
        }

    } catch (error) {
        console.error(`❌ 请求异常: ${error.message}`);
        return null;
    }
}

async function main() {
    console.log('========================================');
    console.log('豆包API测试开始');
    console.log('========================================\n');

    console.log('✓ API Key已配置');
    console.log(`✓ API Key前缀: ${DOUBAO_API_KEY.substring(0, 10)}...`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < testArticles.length; i++) {
        const article = testArticles[i];
        const text = `${article.title}\n\n${article.description}`;

        const summary = await testDoubaoAPI(text, i);

        if (summary) {
            successCount++;
        } else {
            failCount++;
        }

        // 请求间隔，避免限流
        if (i < testArticles.length - 1) {
            await delay(2000);
        }
    }

    console.log('\n========================================');
    console.log('测试完成');
    console.log(`成功: ${successCount} / 失败: ${failCount}`);
    console.log('========================================');

    if (successCount === testArticles.length) {
        console.log('\n🎉 豆包API工作正常！可以用于正式抓取。');
    } else if (successCount > 0) {
        console.log('\n⚠️  部分请求失败，可能是网络问题或API限流。');
    } else {
        console.log('\n❌ 所有请求都失败了，请检查：');
        console.log('   1. API Key是否正确');
        console.log('   2. API Key是否有足够的额度');
        console.log('   3. 网络连接是否正常');
        console.log('   4. 豆包API服务是否可用');
    }
}

main().catch(error => {
    console.error('❌ 发生错误:', error);
    process.exit(1);
});
