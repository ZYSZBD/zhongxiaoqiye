<template>
  <div class="policy-database">
    <!-- Header banner -->
    <div class="page-banner">
      <div class="banner-title">
        <img src="@/assets/img/lstart.png" class="star-icon" alt="" v-if="hasLstart" @error="hasLstart = false"/>
        <span class="diamond" v-else>◆</span>
        <span><span class="title-primary">重点</span><span class="title-secondary">申报</span></span>
        <img src="@/assets/img/rstart.png" class="star-icon" alt="" v-if="hasRstart" @error="hasRstart = false"/>
        <span class="diamond" v-else>◆</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-container">
      <!-- 顶部搜索及筛选区域 -->
      <div class="filter-card">
        <!-- 搜索栏 -->
        <div class="search-row">
          <div class="search-label">搜 索</div>
          <div class="search-input-wrapper">
            <el-input
              v-model="keyword"
              placeholder="输入政策关键词进行搜索 查看政策条件、获批企业名单、对应政策补贴"
              class="custom-search-input"
              size="large"
            >
              <template #append>
                <el-button :icon="Search" class="search-btn"></el-button>
              </template>
            </el-input>
          </div>
        </div>

        <!-- 筛选项 -->
        <div class="filter-options">
          <div class="filter-row" style="position: relative;" :class="{ 'is-collapsed': isLevelCollapsed }">
            <div class="filter-label" :class="{ 'active-label': activeLevel !== '全部' }">政策等级 </div>
            <el-tooltip
              content="请先选择【政策等级】"
              placement="top"
              effect="light"
            >
              <el-icon class="question-icon"><QuestionFilled /></el-icon>
            </el-tooltip>
            <div class="filter-items">
              <span 
                v-for="item in levelOptions" 
                :key="item"
                class="filter-item" 
                :class="{ active: activeLevel === item }"
                @click="activeLevel = item"
              >{{ item }}</span>
            </div>
            <div class="collapse-btn" @click="isLevelCollapsed = !isLevelCollapsed">
              {{ isLevelCollapsed ? '展开' : '收起' }} 
              <el-icon><ArrowDown v-if="isLevelCollapsed" /><ArrowUp v-else /></el-icon>
            </div>
          </div>

          <div class="filter-row" :class="{ 'is-collapsed': isUnitCollapsed }">
            <div class="filter-label" :class="{ 'active-label': activeUnit !== '全部' }">发布单位</div>
            <div class="filter-items">
              <span 
                v-for="item in unitOptions" 
                :key="item"
                class="filter-item" 
                :class="{ active: activeUnit === item }"
                @click="activeUnit = item"
              >{{ item }}</span>
            </div>
            <div class="collapse-btn" @click="isUnitCollapsed = !isUnitCollapsed">
              {{ isUnitCollapsed ? '展开' : '收起' }} 
              <el-icon><ArrowDown v-if="isUnitCollapsed" /><ArrowUp v-else /></el-icon>
            </div>
          </div>

          <div class="filter-row" :class="{ 'is-collapsed': isDomainCollapsed }">
            <div class="filter-label" :class="{ 'active-label': activeDomain !== '全部' }">支持领域</div>
            <div class="filter-items">
              <span 
                v-for="item in domainOptions" 
                :key="item"
                class="filter-item" 
                :class="{ active: activeDomain === item }"
                @click="activeDomain = item"
              >{{ item }}</span>
            </div>
            <div class="collapse-btn" @click="isDomainCollapsed = !isDomainCollapsed">
              {{ isDomainCollapsed ? '展开' : '收起' }} 
              <el-icon><ArrowDown v-if="isDomainCollapsed" /><ArrowUp v-else /></el-icon>
            </div>
          </div>
          
          <div class="filter-row">
            <div class="filter-label" :class="{ 'active-label': activeStatus !== '全部' }">政策动态</div>
            <div class="filter-items">
              <span 
                v-for="item in statusOptions" 
                :key="item"
                class="filter-item" 
                :class="{ active: activeStatus === item }"
                @click="selectStatus(item)"
              >{{ item }}</span>
            </div>
            <div class="collapse-btn">
              <el-button type="primary"   size="small" class="reset-btn" @click="resetFilters">
                <el-icon><RefreshRight /></el-icon> 重置
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 下方两栏布局 -->
      <div class="content-layout">
        <div class="left-content">
          <!-- 政策列表区域 -->
          <div class="policy-list">
            <div class="policy-item" v-for="(item, index) in policyList" :key="index">
              <div class="item-header">
                <h3 class="policy-title" @click="$router.push('/policy/PolicyDatabase/detail')">{{ item.title }}</h3>
                <span class="tag-level">{{ item.level }}</span>
                <span
                  class="tag-status"
                  :class="{
                    'status-green': item.status === '申报中',
                    'status-red': item.status === '公示中',
                    'status-gray': item.status !== '申报中' && item.status !== '公示中'
                  }"
                >{{ item.status }}</span>
              </div>
              <div class="item-unit">
                发布单位：{{ item.unit }}
              </div>
              <div class="item-links">
                <a href="#" class="link-item">申报信息</a>
                <a href="#" class="link-item">政策资讯</a>
                <a href="#" class="link-item">支持力度</a>
                <a href="#" class="link-item">公示名单</a>
                <a href="#" class="link-item">业务线索</a>
              </div>
            </div>
              <!-- 分页组件 -->
          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="currentPage"
              layout="prev, pager, next, jumper"
              :total="filteredPolicyList.length"
              @current-change="handleCurrentChange"
              background
            />
          </div>
          </div>

        
        </div>

        <div class="right-sidebar">
          <!-- 热搜榜 -->
          <div class="sidebar-card hot-search-card">
            <div class="card-header">
              <div class="title">
                <span class="title-blue">热搜</span>榜
              </div>
            </div>
            <div class="hot-list">
              <div class="hot-item" v-for="(item, index) in hotPolicies" :key="index">
                <span class="rank" :class="{'top-rank': index < 3}">{{ index + 1 }}</span>
                <span class="policy-name" :title="item">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Search, ArrowUp, ArrowDown, QuestionFilled, RefreshRight } from '@element-plus/icons-vue'

const keyword = ref('')
const hasLstart = ref(true)
const hasRstart = ref(true)

// Filter active states
const activeLevel = ref('江苏省')
const activeUnit = ref('工业和信息化厅')
const activeDomain = ref('全部')
const activeStatus = ref('全部')

// Collapse states
const isLevelCollapsed = ref(false)
const isUnitCollapsed = ref(true)
const isDomainCollapsed = ref(true)

// Filter data
const levelOptions = [
  '全部',
  '国家级',
  '江苏省',
  '南京市',
  '江宁区',
  '江北新区',
  '鼓楼区',
  '栖霞区',
  '秦淮区',
  '建邺区',
  '玄武区',
  '雨花台区',
  '溧水区',
  '六合区',
  '高淳区',
  '浦口区',
  '南京经济技术开发区',
  '中国（南京）软件谷'
]
const unitOptions = [
  '全部',
  '人民政府',
  '发展和改革委员会',
  '工业和信息化厅',
  '科学技术厅',
  '财政厅',
  '人力资源和社会保障厅',
  '教育厅',
  '民政厅',
  '自然资源厅',
  '退役军人事务厅',
  '国家密码管理局',
  '林业局',
  '住房和城乡建设厅',
  '交通运输厅',
  '水利厅',
  '农业农村厅',
  '商务厅',
  '文化和旅游厅（文物局）',
  '卫生健康委员会',
  '应急管理厅',
  '市场监督管理局',
  '体育局',
  '知识产权局',
  '中医药管理局',
  '邮政管理局',
  '中国共产党江苏省委委员会宣传部',
  '中国共产党江苏省委委员会人才工作领导小组办公室',
  '气象局',
  '国家税务总局江苏省税务局',
  '疾病预防控制局',
  '乡村振兴局',
  '质量发展委员会办公室',
  '中国共产党江苏省委委员会网络安全和信息化委员会办公室',
  '共产主义青年团江苏省委委员会',
  '中国共产党委员会信息化工作领导小组办公室',
  '广播电视局',
  '中国共产党江苏省委委员会农村工作领导小组办公室',
  '中国共产党江苏省委委员会统一战线工作部'
]
const domainOptions = [
  '全部',
  '乡村振兴,制造业（含建筑业）',
  '乡村振兴,质量强省建设,服务业,制造业,老字号产业',
  '乡村，乡村振兴和生命健康，农业和社会发展',
  '互联网平台,服务平台',
  '互联网行业,数据中心',
  '交通运输,交通运输业',
  '交通运输业,交通运输',
  '产业园区,新型工业化产业示范基地',
  '产业转移合作，农业，农业与农村发展',
  '人工智能',
  '人工智能，量子科技，脑机接口，生物制药，网络通信，元宇宙，先进计算，数据技术',
  '企业,行政事业单位,教育业,医疗卫生业,会计',
  '审计及税务服务',
  '企业服务,创新创业大赛,创业大赛',
  '住宿业',
  '住房城乡建设',
  '体育',
  '体育服务',
  '信息技术,信息技术企业,新一代信息技术',
  '信息消费',
  '先进制造',
  '公共交通,绿色科技,城市可持续发展',
  '公共卫生,医药卫生,关键生物技术',
  '养殖,渔业,渔农业',
  '养老,健康养老,制造业（含建筑业）',
  '养老服务产业',
  '再生资源回收利用',
  '农业',
  '农业,传媒业,摄影业,短视频行业',
  '农业,农业机械,农产品加工',
  '农业,农产品生产与供应,乡村产业,农业科技,乡村建设,乡村治理'
]
const statusOptions = ['全部', '申报中', '公示中', '无动态', '疑似过期']

// 分页数据
const currentPage = ref(1)
const pageSize = 10
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

watch(keyword, () => {
  currentPage.value = 1
})

const selectStatus = (status) => {
  activeStatus.value = status
  currentPage.value = 1
}

const resetFilters = () => {
  activeLevel.value = '全部'
  activeUnit.value = '全部'
  activeDomain.value = '全部'
  activeStatus.value = '全部'
  keyword.value = ''
  currentPage.value = 1
}

const policyList = ref([
  {
    title: '高新技术企业',
    level: '江苏省',
    status: '申报中',
    unit: '工业和信息化厅'
  },
  {
    title: '江苏省首批次新材料',
    level: '江苏省',
    status: '申报中',
    unit: '工业和信息化厅'
  },
  {
    title: '江苏省先进级智能工厂',
    level: '江苏省',
    status: '申报中',
    unit: '工业和信息化厅'
  },
  {
    title: '江苏省5G工厂',
    level: '江苏省',
    status: '无动态',
    unit: '工业和信息化厅'
  },
  {
    title: '江苏省化工（危险化学品）企业老旧装置更新改造补助资金项目',
    level: '江苏省',
    status: '无动态',
    unit: '工业和信息化厅'
  },
  {
    title: '（江苏省）长三角区域未来产业地方标准项目',
    level: '江苏省',
    status: '无动态',
    unit: '工业和信息化厅'
  },
  {
    title: '“创客中国”江苏省中小企业创新创业大赛',
    level: '江苏省',
    status: '无动态',
    unit: '工业和信息化厅'
  },
  {
    title: '江苏省制造强省建设专项资金项目：重点产业技术创新项目、智改数转网联项目、服务体系建设项目、制造业贷款财政贴息项目',
    level: '江苏省',
    status: '申报中',
    unit: '工业和信息化厅、财政厅'
  },
  {
    title: '江苏省企业技术中心认定',
    level: '江苏省',
    status: '公示中',
    unit: '工业和信息化厅'
  },
  {
    title: '江苏省绿色工厂创建示范项目',
    level: '江苏省',
    status: '申报中',
    unit: '工业和信息化厅'
  },
  {
    title: '江苏省服务型制造示范企业认定',
    level: '江苏省',
    status: '无动态',
    unit: '工业和信息化厅'
  }
])

const filteredPolicyList = computed(() => {
  const searchText = keyword.value.trim()
  const statusMatchedList = activeStatus.value === '全部'
    ? policyList.value
    : policyList.value.filter(item => item.status === activeStatus.value)

  if (!searchText) {
    return statusMatchedList
  }
  return statusMatchedList.filter(item => item.title.includes(searchText))
})

const pagedPolicyList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredPolicyList.value.slice(start, end)
})

const hotPolicies = ref([
  '高新技术企业',
  '国家科技型中小企业',
  '专精特新“小巨人”企业',
  '研发费用加计扣除',
  '国家企业技术中心',
  '国家级知识产权强国（国家知识产权示范...',
  '智能制造试点示范（智能制造典型场景...',
  '专精特新重点“小巨人”企业',
  '国家级绿色制造（绿色工厂、绿色设计...',
  '国家技术创新示范企业',
  '国家级质量标杆',
  '国家重点研发计划',
  '国家级工业设计中心',
  '国家级服务型制造示范（国家级服务型...',
  '国家文化和科技融合示范基地',
  '国家级众创空间',
  '工业和信息化部重点实验室',
  '中华老字号',
  '中国专利奖',
  '“创客中国”中小企业创新创业大赛'
])
</script>

<style scoped lang="scss">
.policy-database {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 40px;
  :deep(.el-input-group__append) {
    border: none !important;
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

      .title-primary {
        color: #1078f9;
      }
      .divider {
        color: #333;
        margin: 0 5px;
      }
      .title-secondary {
        color: #333;
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

  .main-container {
    margin: 0 auto;
    margin-top: 20px;
    
    .filter-card {
      background: #fff;
      border-radius: 8px;
      padding: 15px 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
      margin-bottom: 20px;

      .search-row {
        display: flex;
        align-items: center;
        margin-bottom: 25px;

        .search-label {
          font-size: 14px;
          color: #666;
          margin-right: 10px;
          padding: 0 10px;
          text-align: center;
          letter-spacing: 14px;
        }

        .search-input-wrapper {
          flex: 1;
          max-width: 800px;

          :deep(.el-input__wrapper) {
            border: 1px solid #dcdfe6;
            box-shadow: none;
            padding-left: 15px;
            &:hover, &.is-focus {
              border-color: #1078f9;
            }
          }
          :deep(.el-input-group__append) {
            background-color: transparent;
            border: 1px solid #dcdfe6;
            border-left: 0;
            color: #1078f9;
            font-size: 18px;
            padding: 0 20px;
            cursor: pointer;
            &:hover {
              color: #66b1ff;
            }
          }
        }
      }

      .filter-options {

        .filter-row {
          display: flex;
          padding: 12px 0;
          border-bottom: 1px dashed #f0f2f5;
          overflow: hidden;

          &.is-collapsed {
            .filter-items {
              height: 28px;
              overflow: hidden;
            }
          }

          &:last-child {
            border-bottom: none;
          }

          .filter-label {
            width: 80px;
            font-size: 14px;
            color: #666;
            margin-top: 4px;
            text-align: center;
            margin-right: 40px;
            
            &.active-label {
              color: #1078f9;
              border: 1px solid #1078f9;
              border-radius: 4px;
              background-color: #1079f90e;
              padding: 2px 8px;
              height: fit-content;
            }

        
          }
          .question-icon {
              margin-left: 4px;
              color: #a8abb2;
              cursor: pointer;
              left: 85px;
              top: 19px;
              position: absolute;
            }
          .filter-items {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 10px 25px;

            .filter-item {
              font-size: 14px;
              color: #333;
              cursor: pointer;
              padding: 4px 0;

              &.active {
                color: #1078f9;
                border-bottom: 2px solid #1078f9;
              }

              &:hover {
                color: #1078f9;
              }
            }
          }

          .collapse-btn {
            width: 60px;
            color: #1078f9;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 4px;

            .el-icon {
              margin-left: 4px;
            }

            .reset-btn {
              border-color: #1078f9;
              padding: 4px 15px;
              height: 28px;
              &:hover {
                background-color: #1078f9;
                color: #fff;
              }
            }
          }
        }
      }
    }

    .content-layout {
      display: flex;
      align-items: flex-start;
      gap: 20px;

      .left-content {
        flex: 1;
        min-width: 0;

        .policy-list {
          background: #fff;
          border-radius: 8px;
          padding: 20px 30px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

          .policy-item {
            padding: 25px 0;
            border-bottom: 1px dashed #ebeef5;

            &:last-child {
              border-bottom: none;
            }

            .item-header {
              display: flex;
              align-items: center;
              margin-bottom: 15px;

              .policy-title {
                font-size: 20px;
                color: #333;
                max-width: 75%;
                margin: 0 15px 0 0;
                font-weight: bold;
                cursor: pointer;
                
                &:hover {
                  color: #1078f9;
                }
              }

              .tag-level {
                color: #1078f9;
                border: 1px solid #ecf5ff;
                background-color: #ecf5ff;
                font-size: 14px;
                padding: 2px 8px;
                border-radius: 4px;
                margin-right: 10px;
              }

              .tag-status {
                font-size: 13px;
                padding: 2px 8px;
                border: 1px solid;

                &.status-green {
                  color: #00b368;
                  border-color: #00b368;
                }

                &.status-red {
                  color: #f6342a;
                  border-color: #f6342a;
                }

                &.status-gray {
                  color: rgb(53, 64, 83);
                  border-color: rgb(53, 64, 83);
                }
              }
            }

            .item-unit {
              font-size: 14px;
              color: #666;
              margin-bottom: 30px;
            }

            .item-links {
              display: flex;
              justify-content: space-between;
 

              .link-item {
                font-size: 16px;
                color: #1078f9;
                text-decoration: none;
                position: relative;

                &:after {
                  content: '';
                  position: absolute;
                  bottom: -2px;
                  left: 0;
                  width: 100%;
                  height: 1px;
                  background-color: #1078f9;
                }

                &:hover {
                  color: #1078f9;
                  &:after {
                    background-color: #66b1ff;
                  }
                }
              }
            }
          }
        }

        .pagination-wrapper {
          padding: 20px 30px 0;
          display: flex;
          justify-content: flex-end;
        }
      }

      .right-sidebar {
        width: 300px;
        
        .hot-search-card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
          
          .card-header {
            padding: 18px 20px;
            border-bottom: 1px solid #f0f2f5;
            background-color: #f8fbff;
            border-radius: 8px 8px 0 0;

            .title {
              font-size: 20px;
             
              color: #1a1a1a;

              .title-blue {
                color: #1078F9;
              }
            }
          }

          .hot-list {
            padding: 10px 20px 20px;

            .hot-item {
              display: flex;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px dashed #ebeef5;
              cursor: pointer;

              &:last-child {
                border-bottom: none;
              }

              &:hover {
                .policy-name {
                  color: #1078f9;
                }
              }

              .rank {
                width: 20px;
                font-size: 16px;
                font-weight: bold;
                color: #354053;
                margin-right: 10px;

                &.top-rank {
                  color: #ffb800;
                }
              }

              .policy-name {
                font-size: 14px;
                color: #333;
                transition: color 0.3s;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
