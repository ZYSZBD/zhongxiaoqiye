<template>
  <div class="policy-news-detail">
    <div class="page-banner">
      <div class="banner-title">
        <img src="@/assets/img/lstart.png" class="star-icon" alt="" v-if="hasLstart" @error="hasLstart = false" />
        <span class="diamond" v-else>◆</span>
        <span> <span class="highlight">政策</span>资讯</span>
        <img src="@/assets/img/rstart.png" class="star-icon" alt="" v-if="hasRstart" @error="hasRstart = false" />
        <span class="diamond" v-else>◆</span>
      </div>
    </div>

    <div class="main-container">
      <div class="layout">
        <main class="main-col">
          <!-- 标题卡片 -->
          <section class="card summary-card">
            <div class="title-row">
              <h1 class="article-title">{{ article.title }}</h1> 
              <div class="title-actions">
                <el-button class="action-btn" plain>
                  <el-icon  style="color: #409EFF;"><Plus /></el-icon> 关注
                </el-button>
                <el-button class="action-btn" plain>
                  <el-icon style="color: #E6A23C;"><Star /></el-icon> 收藏
                </el-button>
                <el-button class="action-btn icon-only" plain  >
                  <el-icon style="color: #67C23A;"><Share /></el-icon>转发
                </el-button>
              </div>
            </div>

            <div class="info-strip">
              <span>发布时间：{{ displayPublish }}</span>
              <span class="sep">|</span>
              <span>发布部门：{{ article.unit }}</span>
              <span class="sep">|</span>
              <span>浏览量：954次</span>
            </div>

            <div v-if="article.inProgress" class="status-banner">
              <el-icon class="clock"><Clock /></el-icon>
              <span>进行中：{{ statusRangeText }}</span>
            </div>

            <div class="original-row">
              <span class="label">原文链接：</span>
              <a :href="article.originalUrl" target="_blank" rel="noopener noreferrer" class="link-original">{{ article.originalUrl }}</a>
            </div>

            <div class="tags-row">
              <span class="tag-badge green-tag">市级</span>
              <span class="tag-badge gray-tag">引导扶持</span>
              <span class="tag-badge gray-tag">发文来源：常州市市场监督管理局（常州市知识产权局）</span>
              <span class="tag-badge gray-tag">政策文号：常市监〔2026〕19号</span>
            </div>
          </section>

          <!-- 相关申报项目 -->
          <section class="card block-card">
            <h2 class="block-heading">相关申报项目</h2>
            <div class="related-inner">
              <div class="related-text">
                <div class="related-name">{{ article.relatedProjectName }}</div>
                <div class="related-unit">发布单位：{{ article.relatedProjectUnit }}</div>
              </div>
              <el-button type="primary" class="btn-apply">我要申报</el-button>
            </div>
          </section>

          <!-- 正文卡片 -->
          <section class="card body-card">
            <div class="body-tabs">
              <div class="body-tab active">政策原文</div>
            </div>
            
            <div class="article-body">
              <p v-for="(p, i) in article.bodyParagraphs" :key="i">{{ p }}</p>
            </div>

            <div class="article-attachments" v-if="article.attachments && article.attachments.length">
              <div class="attach-title">附件：</div>
              <ul class="attach-list">
                <li v-for="(file, idx) in article.attachments" :key="idx">
                  <a href="#" class="attach-link">{{ file }}</a>
                </li>
              </ul>
            </div>
          </section>

          <!-- 相关政策 -->
          <section class="card block-card related-policies-card">
            <h2 class="block-heading">相关政策</h2>
            <ul class="related-list">
              <li v-for="(policy, idx) in article.relatedPolicies" :key="idx">
                <a href="#" class="policy-link">{{ policy.name }}</a>
                <span class="policy-unit">{{ policy.unit }}</span>
              </li>
            </ul>
          </section>
        </main>

        <aside class="side-col">
          <!-- 智能专员（整图） -->
          <div class="card interpreter-card">
            <img class="interpreter-hero" src="@/assets/img/rightpeople.jpg" alt="智能项目申报专员" />
          </div>

          <!-- 政策提炼卡片 -->
          <div class="card extract-card">
            <div class="extract-head">
              <div class="icon-wrapper blue-bg">
                <el-icon class="doc-icon"><StarFilled /></el-icon>
              </div>
              <span>政策提炼</span>
            </div>
            <ul class="extract-list">
              <li v-for="(item, idx) in article.highlights" :key="idx" class="extract-item">
                <span class="dot"></span>
                <span class="text">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- 申报推荐卡片 -->
          <div class="card recommend-card">
            <div class="recommend-head">
              <div class="head-left">
                <div class="icon-wrapper blue-bg">
                  <el-icon class="folder-icon"><Folder /></el-icon>
                </div>
                <span>申报推荐</span>
              </div>
              <div class="head-right">
                <el-icon class="refresh-icon"><RefreshRight /></el-icon> 换一换
              </div>
            </div>
            <ul class="recommend-list">
              <li v-for="(item, idx) in article.recommends" :key="idx" class="recommend-item">
                {{ item }}
              </li>
            </ul>
            <div class="recommend-more">
              <a href="#">查看更多 ></a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Star, StarFilled, Folder, RefreshRight } from '@element-plus/icons-vue'

const route = useRoute()
const hasLstart = ref(true)
const hasRstart = ref(true)

const article = ref({
  title: '关于江苏省2026年度省级专精特新中小企业（第二批）认定和通过复核企业名单的公示',
  unit: '江苏省工业和信息化厅',
  publishDate: '2026.1.05',
  originalUrl: 'http://gxt.jiangsu.gov.cn/art/2025/12/5/art_6281_11686341.html',
  relatedProjectName: '江苏省专精特新中小企业',
  relatedProjectUnit: '江苏省工业和信息化厅',
  bodyParagraphs: [
    '根据《关于组织开展2025年度省级专精特新中小企业申报认定（第二批）和2022年度省级专精特新中小企业复核工作的通知》，我厅按规定和程序完成相关认定（复核）审核工作，现将通过企业名单予以公示（见附件）。公示期为2025年12月5日至12月11日，欢迎社会各界参与监督。如有异议，请在公示期内实名反馈省工业和信息化厅，并提供佐证材料和联系方式，以便核实查证。',
    '联系电话：025-69652749（业务），025-69652843（纪检）。',
    '附件：1.2025年省级专精特新中小企业（第二批）公示名单',
    '      2.2025年通过复核省级专精特新中小企业公示名单',
    '江苏省工业和信息化厅',
    '2025年12月5日'
  ],
  attachments: [
    '2025年省级专精特新中小企业（第二批）公示名单',
    '2025年通过复核省级专精特新中小企业公示名单'
  ],
  relatedPolicies: [
    { name: '《江苏省优质中小企业梯度培育实施细则》（核心认定标准）', unit: '江苏省人民政府' },
    { name: '《江苏省专精特新企业培育三年行动计划（2023－2025 年）》', unit: '扬中市人民政府' },
    { name: '工信部《优质中小企业梯度培育管理暂行办法》', unit: '中华人民共和国工业和信息化部' }
  ],
  highlights: [
    '根据《关于组织开展2025年度省级专精特新中小企业申报认定（第二批）和2022年度省级专精特新中小企业复核工作的通知》开展认定（复核）工作',
    '公示期为2025年12月5日至12月11日',
    '公示内容包括2025年省级专精特新中小企业（第二批）公示名单和2025年通过复核省级专精特新中小企业公示名单',
    '异议反馈需在公示期内实名向江苏省工业和信息化厅提交，并提供佐证材料和联系方式',
    '联系电话：025-69652749（业务），025-69652843（纪检）'
  ],
  recommends: [
    '消费新业态新模式新场景试点建设项目',
    '河北省企业百强、制造业百强、服务业百强及创新领先企业',
    '菏泽市科普统计调查'
  ]
})

const displayPublish = computed(() => article.value.publishDate)
</script>

<style scoped lang="scss">
.policy-news-detail {
  min-height: 100vh;
  background: #f5f7fa;
  padding-bottom: 48px;
}

.page-banner {
  height: 86px;
  background-image: url('@/assets/img/titlebac.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .banner-title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;

    .highlight {
      color: #1078f9;
    }

    .star-icon {
      width: 18px;
      height: 18px;
    }

    .diamond {
      color: #1078f9;
      font-size: 16px;
    }
  }
}

.main-container{
 
  margin: 20px auto 0;
  padding: 0 16px;
}

.layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.main-col {
  flex: 1;
  min-width: 0;
}

.side-col {
  width: 350px;
  flex-shrink: 0;
}

.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.summary-card {
  padding: 15px 20px 24px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 16px;
}

.article-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  line-height: 1.5;
  flex: 1;
  margin: 0;
}

.title-actions {
  flex-shrink: 0;
}

.star-btn {
  color: #ffb800;
  border-color: #ffb800;
  &:hover {
    background-color: #fffaf0;
    color: #ffb800;
    border-color: #ffb800;
  }
  .star-icon {
    margin-right: 4px;
  }
}

.info-strip {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;

  .sep {
    margin: 0 12px;
    color: #dcdfe6;
  }
}

.original-row {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;

  .label {
    margin-right: 8px;
  }
  
  .link-original {
    color: #409eff;
    text-decoration: none;
    word-break: break-all;
    &:hover {
      text-decoration: underline;
    }
  }
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 15px;

  .tag-badge {
    padding: 2px 12px;
    font-size: 13px;
    border-radius: 4px;
    
    &.green-tag {
      background-color: #e8f4ed;
      color: #52c41a;
    }
    
    &.gray-tag {
      background-color: #f4f5f7;
      color: #666;
    }
  }
}

.block-card {
 padding: 15px 20px;
}

.block-heading {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  
      padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom:  1px solid #e7e7e7;
}

.related-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fbff;
  border: 1px solid #e6f0ff;
  border-radius: 4px;
  padding: 20px 30px;
}

.related-name {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.related-unit {
  font-size: 14px;
  color: #666;
}

.btn-apply {
  background-color: #1078f9;
  border-color: #1078f9;
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 4px;
}

.body-card {
  padding: 0 0 40px;
}

.body-tabs {
  display: flex;
  border-bottom: 1px solid #ebeef5;
  padding: 0 20px;
  
  .body-tab {
    font-size: 20px;
    color: #666;
    padding: 20px 0;
    margin-right: 40px;
    cursor: pointer;
    position: relative;
    
    &.active {
      color: #1078f9;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #1078f9;
      }
    }
  }
}

.article-body {
  padding: 30px 40px 0;
  font-size: 16px;
  line-height: 2;
  color: #333;

  p {
    margin: 0 0 15px;
    text-indent: 2em;
  }
}

.article-attachments {
  padding: 20px 40px 0;
  
  .attach-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
  }
  
  .attach-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 10px;
    }
    
    .attach-link {
      color: #1078f9;
      text-decoration: none;
      font-size: 16px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.related-policies-card {
  .related-list {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 15px;
      background-color: #f8f9fb;
      padding: 8px 20px;
      border-radius: 4px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .policy-link {
      color: #333;
      text-decoration: none;
      font-size: 15px;
      display: block;
      margin-bottom: 8px;
      
      &:hover {
        color: #1078f9;
      }
    }
    
    .policy-unit {
      color: #999;
      font-size: 14px;
      display: block;
    }
  }
}

.interpreter-card {
  padding: 0;
  overflow: hidden;
  line-height: 0;
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.interpreter-hero {
  width: 100%;
  height: auto;
  display: block;
}

.extract-card, .recommend-card {
  padding: 20px;
  
  .extract-head, .recommend-head {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom:  1px solid #e7e7e7;
    
    .icon-wrapper {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      
      &.blue-bg {
        background-color: #1078f9;
        color: #fff;
      }
    }
  }
}

.extract-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  .extract-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 1.6;
    background-color: #f8f9fb;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #1078f9;
      margin-top: 8px;
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
}

.recommend-head {
  justify-content: space-between;
  
  .head-left {
    display: flex;
    align-items: center;
  }
  
  .head-right {
    font-size: 13px;
    color: #999;
    font-weight: normal;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    
    &:hover {
      color: #1078f9;
    }
  }
}

.recommend-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  
  .recommend-item {
    background-color: #f8f9fb;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.5;
    cursor: pointer;
    
    &:hover {
      background-color: #f0f7ff;
      color: #1078f9;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.recommend-more {
  text-align: center;
  
  a {
    color: #1078f9;
    font-size: 14px;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>