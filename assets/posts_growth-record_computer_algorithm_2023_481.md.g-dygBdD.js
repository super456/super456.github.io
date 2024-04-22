import{j as s,b as i,c as a,aa as n}from"./chunks/framework.BdPFiiJb.js";const E=JSON.parse('{"title":"481. 神奇字符串","description":"","frontmatter":{"title":"481. 神奇字符串","date":"2023-01-19T20:03:06.000Z","tag":["算法"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/computer/algorithm/2023/481.md","filePath":"posts/growth-record/computer/algorithm/2023/481.md","lastUpdated":1713799990000}'),t={name:"posts/growth-record/computer/algorithm/2023/481.md"},l=n(`<h1 id="_481-神奇字符串" tabindex="-1">481. 神奇字符串 <a class="header-anchor" href="#_481-神奇字符串" aria-label="Permalink to &quot;481. 神奇字符串&quot;">​</a></h1><h2 id="解题过程" tabindex="-1">解题过程 <a class="header-anchor" href="#解题过程" aria-label="Permalink to &quot;解题过程&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">INFO</p><p><a href="https://leetcode.cn/problems/magical-string/" target="_blank" rel="noreferrer">题目链接</a> 神奇字符串 s 仅由 &#39;1&#39; 和 &#39;2&#39; 组成，并需要遵守下面的规则： 神奇字符串 s 的神奇之处在于，串联字符串中 &#39;1&#39; 和 &#39;2&#39; 的连续出现次数可以生成该字符串。 s 的前几个元素是 s = &quot;1221121221221121122……&quot; 。如果将 s 中连续的若干 1 和 2 进行分组，可以得到 &quot;1 22 11 2 1 22 1 22 11 2 11 22 ......&quot; 。每组中 1 或者 2 的出现次数分别是 &quot;1 2 2 1 1 2 1 2 2 1 2 2 ......&quot; 。上面的出现次数正是 s 自身。 给你一个整数 n ，返回在神奇字符串 s 的前 n 个数字中 1 的数目</p></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@link</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> https://leetcode.cn/problems/magical-string/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@title</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 481. 神奇字符串</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@description</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 神奇字符串 s 仅由 &#39;1&#39; 和 &#39;2&#39; 组成，并需要遵守下面的规则：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">神奇字符串 s 的神奇之处在于，串联字符串中 &#39;1&#39; 和 &#39;2&#39; 的连续出现次数可以生成该字符串。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">s 的前几个元素是 s = &quot;1221121221221121122……&quot; 。如果将 s 中连续的若干 1 和 2 进行分组，可以得到 &quot;1 22 11 2 1 22 1 22 11 2 11 22 ......&quot; 。每组中 1 或者 2 的出现次数分别是 &quot;1 2 2 1 1 2 1 2 2 1 2 2 ......&quot; 。上面的出现次数正是 s 自身。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">给你一个整数 n ，返回在神奇字符串 s 的前 n 个数字中 1 的数目</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@param</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {number}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> n</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {number}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 解法一</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 思路：通过写出n个字符串然后匹配1即可，难点在于构造字符串 1 和 2 的规律，根据题意可知，前缀为 122，开始，下一项为前一项字符相对个数统计</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 注意：需要将 1 和 2 作为一组进行统计，然后结尾需要去除对应多余的字符</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> magicalString</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;122&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> num0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;0&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">charCodeAt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (str.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> n) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str[index</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">charCodeAt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num0)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;2&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">repeat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(str[index</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">charCodeAt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num0)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">substring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, n).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// const result = magicalString(6) // 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// const result = magicalString(1) // 1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// const result = magicalString(14) // 7</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// const result = magicalString(12) // 6 122112122122</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> magicalString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(result)</span></span></code></pre></div><h2 id="解题感受" tabindex="-1">解题感受 <a class="header-anchor" href="#解题感受" aria-label="Permalink to &quot;解题感受&quot;">​</a></h2><p>这一题题意理解成本相对比较高，一开始以为是固定规律遍历的，然后测试用例不通过，才知道是除前三项外后面添加的字符是根据前面已经生成的组字符次数顺序添加的，有一定的规律，然后简单的通过遍历将 1 和 2 作为一组添加顺序（这样不用计算下一组添加的字符是 1 还是 2），但是最后需要截取对应长度的字符串字符，应为将 1 和2 作为一组添加会添加多余的字符导致计算错误 看了题解双指针的做法是相对比较贴近题意的解题思路的，看来后续需要加强针对双指针的训练和理论知识的掌握</p><h2 id="优质题解" tabindex="-1">优质题解 <a class="header-anchor" href="#优质题解" aria-label="Permalink to &quot;优质题解&quot;">​</a></h2><ul><li><a href="https://leetcode.cn/problems/magical-string/solution/shen-qi-zi-fu-chuan-by-leetcode-solution-y5dg/" target="_blank" rel="noreferrer">https://leetcode.cn/problems/magical-string/solution/shen-qi-zi-fu-chuan-by-leetcode-solution-y5dg/</a></li><li><a href="https://leetcode.cn/problems/magical-string/solution/by-endlesscheng-z8o1/" target="_blank" rel="noreferrer">https://leetcode.cn/problems/magical-string/solution/by-endlesscheng-z8o1/</a></li><li><a href="https://leetcode.cn/problems/magical-string/solution/by-ac_oier-7wjo/" target="_blank" rel="noreferrer">https://leetcode.cn/problems/magical-string/solution/by-ac_oier-7wjo/</a></li><li><a href="https://leetcode.cn/problems/magical-string/solution/zhua-wa-mou-si-tu-jie-leetcode-by-muse-7-i2z6/" target="_blank" rel="noreferrer">https://leetcode.cn/problems/magical-string/solution/zhua-wa-mou-si-tu-jie-leetcode-by-muse-7-i2z6/</a></li><li><a href="https://leetcode.cn/problems/magical-string/solution/shen-qi-zi-fu-chuan-shi-zhen-de-shen-qi-jhtru/" target="_blank" rel="noreferrer">https://leetcode.cn/problems/magical-string/solution/shen-qi-zi-fu-chuan-shi-zhen-de-shen-qi-jhtru/</a></li></ul>`,8),h=[l];function e(p,k,r,d,g,o){return i(),a("div",null,h)}const y=s(t,[["render",e]]);export{E as __pageData,y as default};
