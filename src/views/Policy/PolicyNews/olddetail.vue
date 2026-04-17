<template>
  <div class="policy-news-page">
    <!-- Header banner -->
    <div class="page-banner">
      <div class="banner-title">
        <img src="@/assets/img/lstart.png" class="star-icon" alt="" v-if="hasLstart" @error="hasLstart = false"/>
        <span class="diamond" v-else>◆</span>
         <span> <span class="highlight">政策</span>资讯</span>
        <img src="@/assets/img/rstart.png" class="star-icon" alt="" v-if="hasRstart" @error="hasRstart = false"/>
        <span class="diamond" v-else>◆</span>
      </div>
    </div>

    <div class="main-container">
      <div class="filter-card">
        <!-- Tabs Header -->
        <div class="tabs-header">
          <div class="tabs-left">
            <span 
              v-for="tab in tabs" 
              :key="tab" 
              class="tab-item" 
              :class="{ active: activeTab === tab }" 
              @click="activeTab = tab"
            >{{ tab }}</span>
          </div>
          <div class="tabs-right">
            <router-link :to="{ name: 'PolicyNews' }" class="expired-link">
              <el-icon><Document /></el-icon> 政策资讯 <el-icon><ArrowRight /></el-icon>
            </router-link>
          </div>
        </div>

        <!-- Search Row -->
        <div class="search-row">
          <div class="label">关 键 词</div>
          <el-input v-model="keyword" placeholder="请输入关键词搜索" class="search-input">
            <template #suffix>
              <el-icon class="search-icon"><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <!-- Level Row -->
        <div class="level-row" :class="{ 'is-collapsed': isLevelCollapsed }">
          <div class="label">
            发布等级 <el-icon class="question-icon"><QuestionFilled /></el-icon>
          </div>
          <div class="level-items">
            <span 
              v-for="item in levelOptions" 
              :key="item" 
              class="level-item" 
              :class="{ active: activeLevel === item }" 
              @click="activeLevel = item"
            >{{ item }}</span>
          </div>
          <div class="collapse-btn" @click="isLevelCollapsed = !isLevelCollapsed">
            {{ isLevelCollapsed ? '展开' : '收起' }}
            <el-icon><ArrowDown v-if="isLevelCollapsed" /><ArrowUp v-else /></el-icon>
          </div>
        </div>
        

        <div class="level-row">
          <div class="label">
            <span class="level-item active">主题分类</span>
          </div>
          <div class="level-items">
            <span
              v-for="item in categoryOptions"
              :key="item"
              class="level-item"
              :class="{ active: activeCategory === item }"
              @click="handleCategoryClick(item)"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <div class="more-row" v-if="!isFilterExpanded" @click="toggleExpand">
          <span class="more-btn">
            更多
            <el-icon><ArrowDown /></el-icon>
          </span>
        </div>


        <div class="level-row" v-if="isFilterExpanded">
          <div class="label">
            <span class="level-item active">状态</span>
          </div>
          <div class="level-items">
            <span
              v-for="item in statusOptions"
              :key="item"
              class="level-item"
              :class="{ active: activeStatus === item }"
              @click="handleStatusClick(item)"
            >
              {{ item }}
            </span>
          </div>
        </div>


        <div class="level-row" v-if="isFilterExpanded">
          <div class="label">
            <span class="level-item active">发布日期</span>
          </div>
          <div class="level-items">
             <div class="date-range">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                  unlink-panels
                />
             </div>
          </div>
        </div>

        <div class="more-row" v-show="isFilterExpanded" @click="toggleExpand">
          <span class="more-btn">
            收起
            <el-icon><ArrowUp /></el-icon>
          </span>
        </div>


      </div>

      <!-- Table Card -->
      <div class="table-card">
        <el-table 
          :data="tableData" 
          style="width: 100%" 
          border 
          :header-cell-style="{ background: '#d1e5fe', color: '#333', textAlign: 'center', fontWeight: 'bold' }" 
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column prop="title" label="标题" min-width="400" header-align="center" align="left">
            <template #default="scope">
              <router-link
                :to="{ name: 'PolicyNewsDetail', params: { id: String(scope.row.id || 1) } }"
                class="policy-link"
              >
                {{ scope.row.title }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="发布等级" width="150" />
          <el-table-column prop="unit" label="发布单位" width="250" />
          <el-table-column prop="publishDate" label="发布日期" width="150" />
          <el-table-column prop="deadline" label="截止日期" width="150" />
        </el-table>

        <div class="pagination-wrapper">
          <el-pagination 
            layout="prev, pager, next, jumper, slot" 
            :total="3880" 
            :page-size="10"
            background 
          >
            <span class="page-slot-text">页</span>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, QuestionFilled, ArrowDown, ArrowUp, Document, ArrowRight } from '@element-plus/icons-vue'

const hasLstart = ref(true)
const hasRstart = ref(true)
const keyword = ref('')

const activeTab = ref('申报中')
const tabs = ['申报中', '公示中', '新发文']

const isLevelCollapsed = ref(true)
const activeLevel = ref('全部')
const levelOptions = ['全部', '国家级', '江苏省', '南京市', '江宁区', '江北新区', '鼓楼区', '栖霞区', '秦淮区', '建邺区', '玄武区', '雨花台区',
  '溧水区',
  '六合区',
  '高淳区',
  '浦口区',
  '南京经济技术开发区',
  '中国（南京）软件谷']

  const activeCategory = ref('全部') // 默认选中“全部”
const categoryOptions = [
  '全部',
  '引导扶持',
  '减税降费',
  '融资促进',
  '资质荣誉',
  '创业创新',
  '营商环境',
  '人才发展',
  '监督管理',
  '安全生产',
  '综合'
]

// 1. 定义变量 (默认 false 表示隐藏下面两行)
const isFilterExpanded = ref(false)

// 2. 切换方法
const toggleExpand = () => {
  isFilterExpanded.value = !isFilterExpanded.value
}

// ... 其他代码保持不变 ...

const activeStatus = ref('申报通知')

const statusOptions = [
  '申报通知',
  '公示公告',
  '政策法规',
  '意见征集',
  '政策解读',
  '其他'
]

// 3. 点击处理逻辑
const handleCategoryClick = (item) => {
  // 直接把点击的 item 赋值给 activeCategory
  // 点谁谁就是老大，原来的“全部”自动失效
  activeCategory.value = item
}
const handleStatusClick = (item) => {
  activeStatus.value = item // 这里也要改成 activeStatus
}
const dateRange = ref([])

// 2. 处理日期变化
const handleDateChange = (val) => {
  if (val) {
    console.log('开始日期:', val[0])
    console.log('结束日期:', val[1])
    // 在这里触发搜索或筛选逻辑
  } else {
    console.log('日期已清空')
  }
}

const tableData = ref([
  {
    id: 11,
    title: '关于2026年记账式附息（七期）国债第一次续发行工作有关事宜的通知',
    level: '国家级',
    unit: '财政部',
    publishDate: '2026-04-09',
    deadline: '2026-04-13'
  },
  {
    id: 12,
    title: '关于组织申报2026年度省前沿技术研发计划（现代农业）项目的通知',
    level: '南京市',
    unit: '科学技术局',
    publishDate: '2026-04-08',
    deadline: '2025-05-07'
  },
  {
    id: 13,
    title: '关于2026年记账式贴现（二十一期）国债发行工作有关事宜的通知',
    level: '国家级',
    unit: '财政部',
    publishDate: '2026-04-07',
    deadline: '2026-04-09'
  },
  {
    id: 14,
    title: '关于2026年记账式附息（四期）国债第二次续发行工作有关事宜的通知',
    level: '国家级',
    unit: '财政部',
    publishDate: '2026-04-07',
    deadline: '2026-04-09'
  },
  {
    id: 15,
    title: '2026年雨花台区汽车活动发放机构评选公告',
    level: '雨花台区',
    unit: '商务局',
    publishDate: '2026-04-01',
    deadline: '2026-04-07'
  },
  {
    id: 16,
    title: '关于公开征求《基于专用频率的民用无人驾驶航空器系统无线信标技术规范》强制性国家标准制修订计划项目意见的公示',
    level: '国家级',
    unit: '工业和信息化部',
    publishDate: '2026-04-01',
    deadline: '2026-04-08'
  },
  {
    id: 17,
    title: '关于2025年度享受研发费用加计扣除政策的工业母机企业清单制定工作有关事项的通知',
    level: '国家级',
    unit: '国家发展和改革委员会、工业和信息化部、财政…',
    publishDate: '2026-03-31',
    deadline: '2026-03-31'
  },
  {
    id: 18,
    title: '2026年雨花台区消费券发放机构评选公告',
    level: '雨花台区',
    unit: '商务局',
    publishDate: '2026-03-31',
    deadline: '2026-04-03'
  },
  {
    id: 19,
    title: '关于征集南京市创业陪跑导师的公告',
    level: '南京市',
    unit: '人力资源和社会保障局',
    publishDate: '2026-03-31',
    deadline: '2026-04-10'
  },
  {
    id: 20,
    title: '关于组织开展2026年国家《首台（套）重大技术装备推广应用指导目录》修订建议征集工作的通知',
    level: '南京市',
    unit: '工业和信息化局',
    publishDate: '2026-03-31',
    deadline: '2026-04-08'
  },
  {
    id: 21,
    title: '《关于做好“创赢未来”2026创业大赛我省参赛相关工作的通知》(苏人社函〔2026〕40号)',
    level: '江苏省',
    unit: '人力资源和社会保障厅',
    publishDate: '2026-03-26',
    deadline: '2026-04-09'
  },
  {
    id: 22,
    title: '关于组织开展江苏省工业和信息化领域行业高质量数据集建设先行先试工作的通知',
    level: '南京市',
    unit: '工业和信息化局',
    publishDate: '2026-03-26',
    deadline: '2026-03-30'
  },
  {
    id: 23,
    title: '关于开展2026年会计专业技术人员继续教育工作的通知',
    level: '溧水区',
    unit: '财政局',
    publishDate: '2026-03-26',
    deadline: '2026-04-09'
  }
])
</script>

<style scoped lang="scss">

/* 更多/收起 按钮的容器 */
.more-row {
  /* 确保它独占一行，并且宽度撑满父容器 */
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  margin-top: 10px;        /* 距离上一行内容的间距 */
  padding-bottom: 5px;     /* 底部留一点空隙 */
}

/* 按钮本身的样式 */
.more-btn {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #409EFF; /* Element UI 的蓝色 */
  cursor: pointer;
  user-select: none; /* 防止双击选中文字 */
  padding: 5px 15px;
  border-radius: 4px;
  transition: all 0.3s;
}

/* 鼠标悬停效果 */
.more-btn:hover {
  background-color: #409EFF;
  color: #fff;
}

/* 图标旋转动画 */
.more-btn .el-icon {
  margin-left: 4px;
  font-size: 12px;
  transition: transform 0.3s;
}

/* 展开时图标旋转 180 度 (变成向上) */
.more-btn .rotate {
  transform: rotate(180deg);
}

.policy-news-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 40px;

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

      .highlight { color: #1078f9; }
      .star-icon { width: 18px; height: 18px; }
      .diamond { color: #1078f9; font-size: 16px; }
    }
  }

  .main-container {
    width: 1200px;
    margin: 20px auto 0;

    .filter-card {
      background: #fff;
      border-radius: 8px;
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

      .tabs-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        padding-bottom: 15px;
        margin-bottom: 25px;

        .tabs-left {
          display: flex;
          gap: 30px;

          .tab-item {
            font-size: 16px;
            color: #333;
            cursor: pointer;
            padding-bottom: 14px;
            margin-bottom: -16px;

            &.active {
              color: #1078f9;
              font-weight: bold;
              border-bottom: 2px solid #1078f9;
            }

            &:hover {
              color: #1078f9;
            }
          }
        }

        .tabs-right {
          .expired-link {
            color: #1078f9;
            text-decoration: none;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 4px;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      .search-row {
        display: flex;
        align-items: center;
        margin-bottom: 25px;

        .label {
          width: 80px;
          color: #666;
          font-size: 14px;
        }

        .search-input {
          width: 800px;

          :deep(.el-input__wrapper) {
            box-shadow: 0 0 0 1px #dcdfe6 inset;
            &:hover, &.is-focus {
              box-shadow: 0 0 0 1px #1078f9 inset;
            }
          }

          .search-icon {
            color: #1078f9;
            font-size: 18px;
            cursor: pointer;
            margin-right: 5px;
          }
        }
      }

      .level-row {
        display: flex;
        align-items: flex-start;
        overflow: hidden;

        &.is-collapsed {
          height: 28px;
        }

        .label {
          width: 80px;
          color: #666;
          font-size: 14px;
          display: flex;
          align-items: center;
          margin-top: 4px;

          .question-icon {
            margin-left: 5px;
            color: #999;
            cursor: pointer;
          }
        }

        .level-items {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 15px 25px;

          .level-item {
            font-size: 14px;
            color: #333;
            cursor: pointer;
            padding: 4px 0;

            &.active {
              color: #1078f9;
            }

            &:hover {
              color: #1078f9;
            }
          }
        }

        .collapse-btn {
          color: #1078f9;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }
      }
    }

    .table-card {
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

      .policy-link {
        color: #1078f9;
        text-decoration: underline;
        text-decoration-color: transparent;
        transition: text-decoration-color 0.3s;
        line-height: 1.6;
        display: inline-block;

        &:hover {
          text-decoration-color: #1078f9;
        }
      }

      .pagination-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
        
        .page-slot-text {
          color: #606266;
          font-weight: 400;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>