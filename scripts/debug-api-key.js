// API Key 调试脚本 - 检查格式问题

const apiKey = process.env.DEEPSEEK_API_KEY;

console.log('========================================');
console.log('DeepSeek API Key 调试');
console.log('========================================\n');

if (!apiKey) {
    console.error('❌ 错误：未设置 DEEPSEEK_API_KEY 环境变量');
    process.exit(1);
}

console.log('✓ API Key已设置\n');

// 检查长度
console.log(`长度: ${apiKey.length} 字符`);

// 检查前缀
if (apiKey.startsWith('sk-')) {
    console.log('✓ 前缀正确: sk-');
} else {
    console.log(`❌ 前缀错误: ${apiKey.substring(0, 3)}`);
}

// 检查是否包含换行符
if (apiKey.includes('\n')) {
    console.log('❌ 包含换行符！');
} else {
    console.log('✓ 不包含换行符');
}

// 检查是否包含空格
if (apiKey.includes(' ')) {
    console.log('❌ 包含空格！');
} else {
    console.log('✓ 不包含空格');
}

// 检查是否包含制表符
if (apiKey.includes('\t')) {
    console.log('❌ 包含制表符！');
} else {
    console.log('✓ 不包含制表符');
}

// 检查是否包含回车符
if (apiKey.includes('\r')) {
    console.log('❌ 包含回车符！');
} else {
    console.log('✓ 不包含回车符');
}

// 显示前后10个字符
console.log(`\n前10字符: "${apiKey.substring(0, 10)}"`);
console.log(`后10字符: "${apiKey.substring(apiKey.length - 10)}"`);

// 检查字符编码
console.log('\n字符编码检查:');
for (let i = 0; i < Math.min(apiKey.length, 5); i++) {
    const char = apiKey[i];
    const code = apiKey.charCodeAt(i);
    console.log(`  [${i}] '${char}' = ${code}`);
}

console.log('\n========================================');
console.log('建议:');
console.log('1. 重新从DeepSeek网站复制API Key');
console.log('2. 粘贴到记事本，检查是否有多余字符');
console.log('3. 删除前后空格');
console.log('4. 重新设置GitHub Secret');
console.log('========================================');
