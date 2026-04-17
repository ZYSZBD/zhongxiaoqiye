<template>
  <div class="company-matching">
    <!-- Header banner -->
    <div class="page-banner">
      <div class="banner-title">
        <img src="@/assets/img/lstart.png" class="star-icon" alt="" v-if="hasLstart" @error="hasLstart = false"/>
        <span class="diamond" v-else>◆</span>
        <span><span class="title-primary">企业</span> 匹配</span>
        <img src="@/assets/img/rstart.png" class="star-icon" alt="" v-if="hasRstart" @error="hasRstart = false"/>
        <span class="diamond" v-else>◆</span>
      </div>
      <div class="banner-search">
        <el-input
          v-model="keyword"
          placeholder="高新技术企业"
          class="custom-search-input"
          size="large"
        >
          <template #append>
            <el-button :icon="Search" class="search-btn"></el-button>
          </template>
        </el-input>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-container">
      <div class="left-content">
        <!-- 顶部热搜区域 -->
        <div class="hot-search-card">
          <div class="hot-search-row">
            <div class="hot-search-label">
              <img src="@/assets/img/fire.png" class="fire-icon" alt="热搜" />热搜<span class="text-black">政策</span>
            </div>
            <div class="hot-search-tags">
              <span class="tag-item"><span class="dot blue"></span>高新技术企业</span>
              <span class="tag-item"><span class="dot blue"></span>专精特新“小巨人”企业</span>
              <span class="tag-item"><span class="dot blue"></span>国家科技型中小企业</span>
              <span class="tag-item">..</span>
            </div>
            <div class="search-btn-wrapper">
              <el-button type="primary" plain size="medium" class="policy-search-btn" @click="isFilterPanelCollapsed = !isFilterPanelCollapsed">
                政策检索
                <span class="toggle-arrows" :class="{ 'is-expanded': !isFilterPanelCollapsed }">
                  <span class="arrow-item"></span>
                  <span class="arrow-item"></span>
                </span>
              </el-button>
            </div>
          </div>
        </div>

        <!-- 筛选区域 -->
        <div class="filter-card" v-show="!isFilterPanelCollapsed">
          <div class="filter-options" >
            <div class="filter-row" :class="{ 'is-collapsed': isLevelCollapsed }">
              <div class="filter-label active-label">政策等级</div>
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

            <div class="filter-row" v-show="activeLevel !== '国家级'" :class="{ 'is-collapsed': isUnitCollapsed }">
              <div class="filter-label">发布单位</div>
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

            <div class="filter-row" :class="{ 'is-collapsed': isNameCollapsed }">
              <div class="filter-label">政策名称</div>
              <div class="filter-items">
                <span 
                  v-for="item in nameOptions" 
                  :key="item"
                  class="filter-item" 
                  :class="{ active: activeName === item }"
                  @click="activeName = item"
                >{{ item }}</span>
              </div>
              <div class="collapse-btn" @click="isNameCollapsed = !isNameCollapsed">
                {{ isNameCollapsed ? '展开' : '收起' }} 
                <el-icon><ArrowDown v-if="isNameCollapsed" /><ArrowUp v-else /></el-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Area -->
        <div class="results-card">
          <img src="@/assets/img/policy.jpg" class="policy-pic" alt=""  />
        </div>
      </div>

      <div class="right-sidebar">
        <!-- 注册地址选择 -->
        <div class="sidebar-card address-card">
          <div class="card-header">
            <div class="title">
              <img src="@/assets/img/lstart.png" class="diamond-icon" alt="" /> 注册地址
            </div>
            <el-button type="primary" size="medium" class="confirm-btn">确定</el-button>
          </div>
          <div class="address-content">
            <!-- 市级列表 -->
            <div class="city-list">
              <div 
                v-for="city in cities" 
                :key="city"
                class="list-item-wrapper"
                :class="{ 'is-active': activeCity === city }"
              >
                <el-checkbox 
                  :label="city" 
                  class="block-checkbox"
                  :model-value="selectedCities.includes(city)"
                  @change="(val) => handleCityChange(city, val)"
                >
                  <span class="city-name" @click.prevent.stop="handleCityClick(city)">{{ city }}</span>
                </el-checkbox>
              </div>
            </div>
            <!-- 区级列表 -->
            <div class="district-list">
              <div 
                v-for="district in currentDistricts" 
                :key="district"
                class="list-item-wrapper"
              >
                <el-checkbox 
                  :label="district" 
                  class="block-checkbox"
                  :model-value="selectedDistricts.includes(district)"
                  @change="(val) => handleDistrictChange(district, val)"
                >{{ district }}</el-checkbox>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门政策线索 -->
        <div class="sidebar-card hot-policy-card">
          <div class="card-header">
            <div class="title">
              <img src="@/assets/img/lstart.png" class="diamond-icon" alt="" /> 热门政策线索
            </div>
          </div>
          <div class="hot-list">
            <div class="hot-item" v-for="(item, index) in hotPolicies" :key="index">
              <span class="rank" :class="{'top-rank': index < 3}">{{ index + 1 }}</span>
              <span class="policy-title">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { jiangsu } from '@/static/jiangsu'

const keyword = ref('')
const hasLstart = ref(true)
const hasRstart = ref(true)

// Filter active states
const activeLevel = ref('江苏省')
const activeUnit = ref('全部')
const activeName = ref('全部')

// Collapse states
const isFilterPanelCollapsed = ref(false)
const isLevelCollapsed = ref(true)
const isUnitCollapsed = ref(true)
const isNameCollapsed = ref(true)

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
const unitOptions = ['全部', '人民政府', '发展和改革委员会', '工业和信息化厅', '科学技术厅', '人力资源和社会保障厅', '商务厅', '市场监督管理局']
const nameOptions = ['“江苏精品”', '江苏省专精特新中小企业', '江苏省中小企业公共服务示范平台', '江苏省企业技术中心', '江苏省众创空间', '江苏省创新型中小企业', '江苏省失业保险稳岗返还', '江苏省工程研究中心', '江苏省省长质量奖', '江苏省科技企业孵化器', '江苏省软件企业技术中心']

const cities = jiangsu.cities.map(city => city.name)

// 当前激活高亮的市级选项（单选，用于控制右侧区县列表显示）
const activeCity = ref('南京市')

// 收集所有选中的城市和区县
const selectedCities = ref(['南京市'])
const selectedDistricts = ref(['玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '江宁区'])

// 计算当前高亮城市对应的区县列表
const currentDistricts = computed(() => {
  const city = jiangsu.cities.find(c => c.name === activeCity.value)
  return city ? city.districts : []
})

// 点击城市名称时：切换右侧列表展示，同时处理选中逻辑
const handleCityClick = (cityName) => {
  activeCity.value = cityName
}

// 选中城市复选框时
const handleCityChange = (cityName, isChecked) => {
  if (isChecked) {
    if (!selectedCities.value.includes(cityName)) {
      selectedCities.value.push(cityName)
    }
  } else {
    selectedCities.value = selectedCities.value.filter(c => c !== cityName)
  }
}

// 选中区县复选框时
const handleDistrictChange = (districtName, isChecked) => {
  if (isChecked) {
    if (!selectedDistricts.value.includes(districtName)) {
      selectedDistricts.value.push(districtName)
    }
  } else {
    selectedDistricts.value = selectedDistricts.value.filter(d => d !== districtName)
  }
}

const hotPolicies = ref([
  '高新技术企业',
  '专精特新“小巨人”企业',
  '国家科技型中小企业',
  '国家级绿色制造：绿色工厂',
  '国家技术创新示范企业',
  '国家级工业设计中心',
  "工业和信息化部重点实验室",
"国家企业技术中心",
"中华老字号",
"中国质量奖"
])
</script>

<style scoped lang="scss">
.company-matching {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 40px;
  .policy-pic {
      width: 100%;
      height: auto;
    }
    :deep(.el-icon svg) {
      margin-top: -4px;      
        }
  .page-banner {
    height: 200px;
    background-image: url('@/assets/img/titlebac.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .banner-title {
      font-size: 22px;
      font-weight: bold;
      color: #333;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;

      .title-primary {
        color: #1078f9;
      }

      .star-icon {
        width: 18px;
        height: 18px;
      }
      .diamond {
        color: #409eff;
        font-size: 16px;
      }
    }

    .banner-search {
      width: 600px;
      
      :deep(.el-input__wrapper) {
        border: none;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding-left: 20px;
        border-radius: 4px 0 0 4px;
      }
      :deep(.el-input-group__append) {
        background-color: #409eff;
        border: none;
        color: #fff;
        font-size: 20px;
        padding: 0 30px;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
        &:hover {
          background-color: #66b1ff;
        }
      }
    }
  }

  .main-container {
    
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }

  .left-content {
    flex: 1;
    min-width: 0;

    .hot-search-card,
    .filter-card {
      background: #fff;
      border-radius: 8px;
      padding: 15px 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    }

    .hot-search-card {
      margin-bottom: 12px;
      background: linear-gradient(135deg, #fcfefe70  0% , #e0fffc54  50%, #7fe3ff2a  100%);
    }

    .filter-card {
      margin-bottom: 20px;
    }

    .hot-search-row {
      display: flex;
      align-items: center;

      .hot-search-label {
        font-size: 22px;
        font-weight: bold;
        color: #ff6b00;
        margin-right: 20px;

        .fire-icon {
          width: 28px;
          height: 28px;
          margin-right: 5px;
          vertical-align: top;
        }
        .text-black {
          color: #333;
        }
      }

      .hot-search-tags {
        flex: 1;
        display: flex;
        gap: 15px;
        white-space: nowrap;     /* 不换行 */
overflow: hidden;        /* 隐藏超出 */
text-overflow: ellipsis; /* 显示 ... */
        
        .tag-item {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #333;
          cursor: pointer;

          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 6px;

            &.blue {
              background-color: rgb(16, 120, 249);
            }
          }

          &:hover {
            color: #409eff;
          }
        }
      }

      .search-btn-wrapper {
        .policy-search-btn {
        background: #cce0f7;
          border-color: #e6f0ff;
          color: #409eff;
          font-weight: bold;
         height: 38px;
          .toggle-arrows {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            margin-left: 8px;
            transition: transform 0.2s ease;
            transform: translateY(-1px);

            .arrow-item {
              width: 6px;
              height: 6px;
              border-right: 1.5px solid #1078f9;
              border-bottom: 1.5px solid #1078f9;
              transform: rotate(45deg);
            }

            .arrow-item + .arrow-item {
              margin-top: -2px;
            }

            &.is-expanded {
              transform: rotate(180deg) translateY(-2px);
            }
          }
        }
      }
    }

    .filter-card {
      .filter-options {
        .filter-row {
          display: flex;
          padding: 15px 0;
          border-bottom: 1px dashed #f0f2f5;
          overflow: hidden;

          &.is-collapsed {
            .filter-items {
              height: 30px; /* Adjust based on single line height */
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
            text-align: center;
            margin-top: 5px;
            margin-right: 15px;
            
            &.active-label {
              background: #eff6ff;
              border: 1px solid #1078f9;
              border-radius: 3px;
              color: #1078f9;
              border-radius: 4px;
              padding: 6px 8px;
              width: auto;
              margin-top: -3px;
              height: fit-content;
              margin-right: 15px;
            }
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
              padding: 5px 0;

              &.active {
                border-bottom: 1px solid #1078f9;
                color: #1078f9;
              }

              &:hover {
                color: #1078f9;
              }
            }
          }

          .collapse-btn {
            width: 60px;
            color: #409eff;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 5px;

            .el-icon {
              margin-left: 4px;
            }
          }
        }
      }
    }

    .results-card {
      background: #fff;
      border-radius: 8px;
      padding: 20px 0px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    }
  }

  .right-sidebar {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .sidebar-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
      
      .card-header {
        padding: 15px 20px;
        border-bottom: 1px solid #f0f2f5;
        background-color: #f8fbff;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          font-size: 22px;
          font-weight: bold;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;

          .diamond-icon {
            width: 18px;
            height: 18px;
            object-fit: contain;
          }
        }
      }
    }

    .address-card {
      .confirm-btn {
        background-color: #e6f0ff;
        color: #409eff;
        border: none;
        &:hover {
          background-color: #409eff;
          color: #fff;
        }
      }

      .address-content {
        padding: 20px;
        display: flex;
        gap: 20px;
        height: 300px;

        .city-list, .district-list {
          flex: 1;
          overflow-y: auto;
          
          /* Custom Scrollbar */
          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-thumb {
            background: #dcdfe6;
            border-radius: 4px;
          }
          &::-webkit-scrollbar-track {
            background: transparent;
          }
        }

        .city-list {
          border-right: 1px solid #ebeef5;
          padding-right: 10px;
        }

        .district-list {
          padding-left: 10px;
        }

        .list-item-wrapper {
          margin-bottom: 5px;
          border-radius: 4px;
          transition: background-color 0.3s;

          &.is-active {
            background-color: #f5f7fa;
            
            .city-name {
              color: #409eff;
              font-weight: bold;
            }
          }

          .block-checkbox {
            display: flex;
            margin-right: 0;
            width: 100%;
            padding: 8px 10px;
            box-sizing: border-box;
            
            :deep(.el-checkbox__label) {
              color: #666;
              flex: 1;
            }
            
            &.is-checked {
              :deep(.el-checkbox__label) {
                color: #409eff;
              }
            }
          }

          .city-name {
            display: inline-block;
            width: 100%;
            cursor: pointer;
            
            &:hover {
              color: #409eff;
            }
          }
        }
      }
    }

    .hot-policy-card {
      .card-header {
        background-color: #f5f5ff;
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
            .policy-title {
              color: #409eff;
            }
          }

          .rank {
            width: 20px;
            font-size: 16px;
            font-weight: bold;
            color: #999;
            margin-right: 10px;
            font-style: italic;

            &.top-rank {
              color: #ffb800;
            }
          }

          .policy-title {
            font-size: 14px;
            color: #333;
            transition: color 0.3s;
          }
        }
      }
    }
  }
}
</style>
