import{_ as n,a as s}from"./app.99a3b371.js";const a={},p=s(`<h2 id="\u95ED\u5305" tabindex="-1"><a class="header-anchor" href="#\u95ED\u5305" aria-hidden="true">#</a> \u95ED\u5305</h2><p>\u95ED\u5305\u5C31\u662F\u4E00\u4E2A\u51FD\u6570\u548C\u5BF9\u5176\u5468\u56F4\u72B6\u6001\u7684\u5F15\u7528\u6346\u7ED1\u5728\u4E00\u8D77\uFF08\u6216\u8005\u8BF4\u51FD\u6570\u88AB\u5F15\u7528\u5305\u56F4\uFF09\u3002\u5373\uFF1A\u95ED\u5305\u8BA9\u4F60\u53EF\u4EE5\u5728\u4E00\u4E2A\u5185\u5C42\u51FD\u6570\u4E2D\u8BBF\u95EE\u5230\u5176\u5916\u5C42\u51FD\u6570\u7684\u4F5C\u7528\u57DF\u3002\u5728JS\u4E2D\u6BCF\u5F53\u521B\u5EFA\u4E00\u4E2A\u51FD\u6570\uFF0C\u95ED\u5305\u5C31\u4F1A\u5728\u51FD\u6570\u521B\u5EFA\u7684\u540C\u65F6\u88AB\u521B\u5EFA\u51FA\u6765\u3002</p><h3 id="\u95ED\u5305\u7684\u4F5C\u7528" tabindex="-1"><a class="header-anchor" href="#\u95ED\u5305\u7684\u4F5C\u7528" aria-hidden="true">#</a> \u95ED\u5305\u7684\u4F5C\u7528</h3><ol><li>\u4FDD\u62A4\uFF1A\u907F\u514D\u81EA\u5DF1\u7684\u53D8\u91CF\u4E0D\u53D7\u5E72\u6270\uFF08\u4F5C\u7528\u57DF\uFF09</li><li>\u4FDD\u5B58\uFF1A\u79C1\u6709\u53D8\u91CF\u4E0D\u88AB\u91CA\u653E\uFF0C\u5C31\u53EF\u4EE5\u4F9B\u8D77\u4E0B\u7EA7\u7684\u4E0A\u4E0B\u6587\u8C03\u7528</li></ol><h3 id="\u5F62\u6210\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5F62\u6210\u6761\u4EF6" aria-hidden="true">#</a> \u5F62\u6210\u6761\u4EF6</h3><ol><li>\u51FD\u6570\u5D4C\u5957</li><li>\u5185\u90E8\u51FD\u6570\u5E94\u7528\u5916\u90E8\u51FD\u6570\u79C1\u6709\u53D8\u91CF</li></ol><h3 id="\u7528\u9014" tabindex="-1"><a class="header-anchor" href="#\u7528\u9014" aria-hidden="true">#</a> \u7528\u9014</h3><ol><li>\u6A21\u4EFF\u5757\u7EA7\u4F5C\u7528\u57DF</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> Counter <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> privateCounter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">changeBy</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    privateCounter <span class="token operator">+=</span> val<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">changeBy</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">decrement</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">changeBy</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">value</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> privateCounter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* logs 0 */</span>
Counter<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Counter<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* logs 2 */</span>
Counter<span class="token punctuation">.</span><span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* logs 1 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><ol><li>\u4FDD\u62A4\u53D8\u91CF\u4E0D\u88AB\u56DE\u6536</li><li>\u5C01\u88C5\u79C1\u6709\u5316\u53D8\u91CF</li><li>\u521B\u5EFA\u6A21\u5757</li></ol><h3 id="\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> \u5E94\u7528\u573A\u666F</h3><ol><li>\u56DE\u6389\u51FD\u6570</li><li>\u51FD\u6570\u5185\u90E8\u8FD4\u56DE\u53E6\u4E00\u4E2A\u533F\u540D\u51FD\u6570</li></ol><h3 id="\u4F18\u7F3A\u70B9" tabindex="-1"><a class="header-anchor" href="#\u4F18\u7F3A\u70B9" aria-hidden="true">#</a> \u4F18\u7F3A\u70B9</h3><ol><li>\u5EF6\u957F\u5C40\u90E8\u53D8\u91CF\u7684\u751F\u547D\u5468\u671F</li><li>\u8FC7\u591A\u7684\u95ED\u5305\u53EF\u80FD\u4F1A\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F</li></ol>`,14);function t(e,o){return p}var l=n(a,[["render",t],["__file","closure.html.vue"]]);export{l as default};