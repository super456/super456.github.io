<!-- 自定义全局页脚 -->
<script setup lang="ts">
</script>

<template>
  <div class="blog-footer">
    <p>
      本站总访问量 <span id="busuanzi_value_site_pv" /> 次 |
      本站访客数 <span id="busuanzi_value_site_uv" /> 人次 |
      本站文章总阅读量 <span id="busuanzi_value_page_pv" /> 次
    </p>
    <p class="footer-item-list">
      <span class="footer-item">
        <i>
          <svg
            width="128" height="128" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          >
            <title>主题</title>
            <path
              d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10a2.5 2.5 0 0 0 2.5-2.5c0-.61-.23-1.2-.64-1.67a.528.528 0 0 1-.13-.33c0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6c0-4.96-4.49-9-10-9zm5.5 11c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zm-3-4c-.83 0-1.5-.67-1.5-1.5S13.67 6 14.5 6s1.5.67 1.5 1.5S15.33 9 14.5 9zM5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S7.33 13 6.5 13S5 12.33 5 11.5zm6-4c0 .83-.67 1.5-1.5 1.5S8 8.33 8 7.5S8.67 6 9.5 6s1.5.67 1.5 1.5z"
            />
          </svg>
        </i>
        <a
          href="https://theme.sugarat.top/" target="_blank"
          rel="noopener noreferrer"
        >@sugarat/theme@0.2.30</a></span><span class="footer-item">
        <i>
          <svg
            t="1695543755857" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="89399" width="200" height="200"
          >
            <path
              d="M512 16C238.066 16 16 238.066 16 512s222.066 496 496 496 496-222.066 496-496S785.934 16 512 16z m234.268 693.506c-3.184 3.734-79.552 91.462-219.702 91.462-169.384 0-288.968-126.52-288.968-291.134 0-162.606 124.008-286.802 287.524-286.802 133.914 0 203.93 74.63 206.844 77.808a24 24 0 0 1 2.476 29.246l-44.76 69.31c-8.098 12.534-25.548 14.702-36.468 4.59-0.466-0.428-53.058-47.76-123.76-47.76-92.232 0-147.832 67.15-147.832 152.164 0 79.204 51.028 159.384 148.554 159.384 77.394 0 130.56-56.676 131.088-57.25 10.264-11.13 28.118-10.066 37.016 2.106l49.094 67.144a24.002 24.002 0 0 1-1.106 29.732z"
              p-id="89400"
            />
          </svg>
        </i>
        <span>MIT License | 纵倾童鞋</span>
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.blog-footer {
  text-align: center;
  font-size: 14px;
  position: relative;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 20px 12px;
  background-color: var(--vp-c-bg);

  .footer-item-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 719px) {
    .footer-item-list {
      flex-direction: column;
      align-items: center;
    }
  }

  .footer-item {
    display: flex;
    align-items: center;
    margin: 0 8px;

    i {
      margin-right: 4px;
    }

    i :deep(svg) {
      fill: var(--vp-c-text-2);
      width: 16px;
      height: 16px;
    }

    i :deep(img) {
      width: 16px;
      height: 16px;
    }

    a:hover {
      color: var(--vp-c-brand-1);
      text-decoration: underline;
      text-decoration-color: var(--vp-c-brand-1);
      text-decoration-style: dashed;
    }
  }
}
</style>
