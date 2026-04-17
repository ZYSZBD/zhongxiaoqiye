<template>
  <div class="policy-detail-wrapper">
    <div class="main-container">
      <!-- Top Search Bar -->
      <div class="top-search-card">
        <div class="search-label">政策搜索</div>
        <el-input v-model="keyword" placeholder="请输入关键词搜索" class="search-input" size="large">
          <template #append>
            <el-button class="search-btn">搜索</el-button>
          </template>
        </el-input>
      </div>

      <div class="detail-header">
        <div class="header-top">
          <h1 class="policy-title">高新技术企业</h1>
          <div class="header-actions">
            <el-button plain class="btn-focus">关注</el-button>
            <!-- <el-button type="primary" plain class="btn-compare">加入对比</el-button> -->
          </div>
        </div>
        <div class="header-bottom">
          <div class="info-left">
            <span class="info-text">国家级 | 全国高新技术企业认定管理工作领导小组办公室</span>
            <span class="status-text">申报中</span>
          </div>
          <div class="info-right">
            <span class="view-count"><el-icon><View /></el-icon> 浏览量:4516</span>
            <span class="update-time">2026-04-13更新</span>
          </div>
        </div>
      </div>

      <!-- Main Content Card -->
      <div class="main-card">

        <!-- Tabs -->
        <div class="detail-tabs">
          <div class="tab-item" :class="{ active: activeTab === '申报信息' }" @click="activeTab = '申报信息'">
            <img src="@/assets/img/one.png" class="tab-icon-img" alt="申报信息" />
            申报信息
          </div>
          <div class="tab-item" :class="{ active: activeTab === '政策资讯' }" @click="activeTab = '政策资讯'">
            <img src="@/assets/img/two.png" class="tab-icon-img" alt="政策资讯" />
            政策资讯
          </div>
          <div class="tab-item" :class="{ active: activeTab === '支持力度' }" @click="activeTab = '支持力度'">
            <img src="@/assets/img/three.png" class="tab-icon-img" alt="支持力度" />
            支持力度
          </div>
          <div class="tab-item" :class="{ active: activeTab === '公示名单' }" @click="activeTab = '公示名单'">
            <img src="@/assets/img/four.png" class="tab-icon-img" alt="公示名单" />
            公示名单
          </div>
          <div class="tab-item" :class="{ active: activeTab === '业务线索' }" @click="activeTab = '业务线索'">
            <img src="@/assets/img/five.png" class="tab-icon-img" alt="业务线索" />
            业务线索
          </div>
        </div>

        <!-- Content -->
        <div class="detail-content">
          <!-- 申报信息内容 -->
          <div v-show="activeTab === '申报信息'">
            <!-- 支持领域 -->
          <div class="content-section">
            <div class="section-title">
              <img src="@/assets/img/lstart.png" class="diamond-icon" alt="" />
              <span class="title-text">支持 <span class="text-blue">领域</span></span>
            </div>
            <div class="section-body bg-gray">
              <div class="body-block">
                <div class="block-header">
                  <span class="level-tag">国家级</span>
                  <span class="block-title">支持领域：</span>
                </div>
                <div class="block-text">
                  <p>在中国境内（不包括港、澳、台地区）内注册成立一年（365个日历天数）以上的居民企业。属于国家重点支持的高新技术领域：</p>
                  <p>一、电子信息</p>
                  <p>二、生物与新医药</p>
                  <p>三、航空航天</p>
                  <p>四、新材料</p>
                  <p>五、高技术服务</p>
                  <p>六、新能源与节能</p>
                  <p>七、资源与环境</p>
                  <p>八、先进制造与自动化</p>
                </div>
              </div>
              
              <div class="body-block mt-20">
                <div class="block-header">
                  <span class="level-tag">江苏省级</span>
                  <span class="block-title">支持领域：</span>
                </div>
                <div class="block-text">
                  <p>（一）企业注册与认定条件</p>
                  <p>在我省行政区域内注册成立一年（365个日历天数）以上的居民企业。</p>
                  <p>（二）高新技术企业认定与管理</p>
                  <p>2021年经江苏省高新技术企业认定管理工作协调小组认定的高新技术企业，以及同年经外省（市）认定机构认定并在有效期内整体迁移至江苏省内的高新技术企业，根据<a href="#" class="text-link">《高新技术企业认定管理办法》（国科发火〔2016〕32号）</a>的规定，其高新技术企业资格至2024年有效期满。如需再次提出认定申请，企业应按照本通知规定办理。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 依据文件 -->
          <div class="content-section">
            <div class="section-title">
              <img src="@/assets/img/lstart.png" class="diamond-icon" alt="" />
              <span class="title-text">依据<span class="text-blue">文件</span></span>
            </div>
            <div class="section-body bg-gray">
              <div class="body-block">
                <span class="level-tag mb-10">国家级</span>
                <div class="file-list">
                  <div class="file-item">
                    <a href="#" class="text-link">《高新技术企业认定管理办法》（国科发火〔2016〕32号）</a>
                    <div class="file-meta">发布部门：科学技术部、财政部、国家税务总局</div>
                  </div>
                  <div class="file-item mt-15">
                    <a href="#" class="text-link">《高新技术企业认定管理工作指引》（国科发火〔2016〕195号）</a>
                    <div class="file-meta">发布部门：科学技术部、财政部、国家税务总局</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 申报条件 -->
          <div class="content-section">
            <div class="section-title">
              <img src="@/assets/img/lstart.png" class="diamond-icon" alt="" />
              <span class="title-text">申报<span class="text-blue">条件</span></span>
            </div>
            <div class="section-body bg-gray">
              <div class="body-block">
                <div class="block-header">
                  <span class="level-tag">国家级</span>
                  <span class="block-title">申报条件：</span>
                </div>
                <div class="block-text">
                  <p>（一）企业申请认定时须注册成立一年以上。</p>
                  <p>（二）企业通过自主研发、受让、受赠、并购等方式，获得对其主要产品（服务）在技术上发挥核心支持作用的知识产权的所有权。</p>
                  <p>（三）对企业主要产品（服务）发挥核心支持作用的技术属于<a href="#" class="text-link">《国家重点支持的高新技术领域》</a>规定的范围。</p>
                  <p>（四）企业从事研发和相关技术创新活动的科技人员占企业当年职工总数的比例不低于10%。</p>
                  <p>（五）企业近三个会计年度（实际经营期不满三年的按实际经营时间计算，下同）的研究开发费用总额占同期销售收入总额的比例符合如下要求：</p>
                  <p>1.最近一年销售收入小于5,000万元（含）的企业，比例不低于5%。</p>
                  <p>2.最近一年销售收入在5,000万元至2亿元（含）的企业，比例不低于4%。</p>
                  <p>3.最近一年销售收入在2亿元以上的企业，比例不低于3%。其中，企业在中国境内发生的研究开发费用总额占全部研究开发费用总额的比例不低于60%。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 申报入口/材料 -->
          <div class="content-section">
            <div class="section-title">
              <img src="@/assets/img/lstart.png" class="diamond-icon" alt="" />
              <span class="title-text">申报<span class="text-blue">入口/材料</span></span>
            </div>
            
            <div class="section-body bg-gray">
              <!-- 国家级块 -->
              <div class="body-block">
                <div class="block-header">
                  <span class="level-tag">国家级</span>
                  <span class="block-title">申报入口</span>
                </div>
                <div class="block-text mb-20">
                  <a href="#" class="text-link">火炬高技术产业开发中心</a>
                </div>

                <div class="block-header mt-20">
                  <span class="level-tag">国家级</span>
                  <span class="block-title">申报材料</span>
                </div>
                <div class="block-text text-gray">
                  暂无申报材料
                </div>
              </div>
            </div>

            <div class="section-body bg-gray mt-20">
              <!-- 江苏省级块 -->
              <div class="body-block">
                <div class="block-header">
                  <span class="level-tag">江苏省级</span>
                  <span class="block-title">申报入口</span>
                </div>
                <div class="block-text mb-20">
                  <p><a href="#" class="text-link">高新技术企业认定管理工作网</a></p>
                  <p><a href="#" class="text-link">科学技术部政务服务平台</a></p>
                </div>

                <div class="block-header mt-20">
                  <span class="level-tag">江苏省级</span>
                  <span class="block-title">申报材料</span>
                </div>
                <div class="material-list">
                  <div class="material-item">
                    <div class="item-left">
                      <el-icon class="folder-icon"><FolderOpened /></el-icon>
                      <span class="item-name">申报材料清单</span>
                    </div>
                    <img src="@/assets/img/down.png" class="down-icon-img" alt="下载" />
                  </div>
                  <div class="material-item">
                    <div class="item-left">
                      <el-icon class="folder-icon"><FolderOpened /></el-icon>
                      <span class="item-name">推荐函（模板）</span>
                    </div>
                    <img src="@/assets/img/down.png" class="down-icon-img" alt="下载" />
                  </div>
                  <div class="material-item">
                    <div class="item-left">
                      <el-icon class="folder-icon"><FolderOpened /></el-icon>
                      <span class="item-name">推荐上报高新技术企业汇总表</span>
                    </div>
                    <img src="@/assets/img/down.png" class="down-icon-img" alt="下载" />
                  </div>
                  <div class="material-item">
                    <div class="item-left">
                      <el-icon class="folder-icon"><FolderOpened /></el-icon>
                      <span class="item-name">推荐上报高新技术企业中介机构情况汇总表</span>
                    </div>
                    <img src="@/assets/img/down.png" class="down-icon-img" alt="下载" />
                  </div>
                  <div class="material-item">
                    <div class="item-left">
                      <el-icon class="folder-icon"><FolderOpened /></el-icon>
                      <span class="item-name">不适用告知承诺制企业知识产权有效性汇总审核表</span>
                    </div>
                    <img src="@/assets/img/down.png" class="down-icon-img" alt="下载" />
                  </div>
                  <div class="material-item">
                    <div class="item-left">
                      <el-icon class="folder-icon"><FolderOpened /></el-icon>
                      <span class="item-name">高新技术企业认定管理机构告知相关事项</span>
                    </div>
                    <img src="@/assets/img/down.png" class="down-icon-img" alt="下载" />
                  </div>
                  <div class="material-item">
                    <div class="item-left">
                      <el-icon class="folder-icon"><FolderOpened /></el-icon>
                      <span class="item-name">高新技术企业申报现场核查主要内容</span>
                    </div>
                    <img src="@/assets/img/down.png" class="down-icon-img" alt="下载" />
                  </div>
                  <div class="material-item">
                    <div class="item-left">
                      <el-icon class="folder-icon"><FolderOpened /></el-icon>
                      <span class="item-name">各地主管部门联系方式</span>
                    </div>
                    <img src="@/assets/img/down.png" class="down-icon-img" alt="下载" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div> <!-- 申报信息内容 结束 -->

          <!-- 政策资讯内容 -->
          <div v-show="activeTab === '政策资讯'" class="policy-info-content">
            <!-- 子选项卡 -->
            <div class="info-sub-tabs">
              <div 
                v-for="tab in subTabs" 
                :key="tab" 
                class="sub-tab-item" 
                :class="{ active: activeSubTab === tab }"
                @click="activeSubTab = tab"
              >{{ tab }}</div>
            </div>

            <!-- 筛选区域 -->
            <div class="info-filters">
              <div class="filter-row">
                <div class="filter-label">选择等级：</div>
                <div class="filter-items">
                  <span v-for="item in levelOptions" :key="item" :class="{ active: filterLevel === item }" @click="filterLevel = item">{{ item }}</span>
                </div>
              </div>
              <div class="filter-row">
                <div class="filter-label">选择年份：</div>
                <div class="filter-items">
                  <span v-for="item in yearOptions" :key="item" :class="{ active: filterYear === item }" @click="filterYear = item">{{ item }}</span>
                </div>
              </div>
              <div class="filter-row">
                <div class="filter-label">政策状态：</div>
                <div class="filter-items">
                  <span v-for="item in statusOptions" :key="item" :class="{ active: filterStatus === item }" @click="filterStatus = item">{{ item }}</span>
                </div>
              </div>
              <div class="filter-row search-row">
                <div class="filter-label">原文标题：</div>
                <div class="search-input-box">
                  <el-input v-model="filterTitle" placeholder="请输入内容"></el-input>
                  <el-button type="primary" class="query-btn">查询</el-button>
                  <el-button class="reset-btn" @click="filterTitle=''">重置</el-button>
                </div>
              </div>
            </div>

            <!-- 表格 -->
            <el-table :data="policyInfoList" border style="width: 100%" class="info-table" :header-cell-style="{ background: 'rgb(241, 247, 255)', color: '#333', textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
              <el-table-column prop="id" label="序号" width="60" />
              <el-table-column prop="title" label="标题" min-width="300">
                <template #default="scope">
                  <a href="#" class="table-link">{{ scope.row.title }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="level" label="发布等级" width="100" />
              <el-table-column prop="unit" label="发布单位" width="180" />
              <el-table-column prop="publishDate" label="发布日期" width="120" />
              <el-table-column prop="deadline" label="截止日期" width="120" />
              <el-table-column prop="remainDays" label="剩余天数" width="100">
                <template #default="scope">
                  <span :class="scope.row.remainDays === '已过期' ? 'text-red' : 'text-red'">{{ scope.row.remainDays }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="contact" label="联系方式" width="100">
                <template #default="scope">
                  <a v-if="scope.row.contact === '点击查看'" href="#" class="table-link">{{ scope.row.contact }}</a>
                  <span v-else>{{ scope.row.contact }}</span>
                </template>
              </el-table-column>
            </el-table>

            <div class="view-all-data">
              <a href="#">查看完整数据</a>
            </div>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="infoCurrentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="80"
                background
              />
            </div>
          </div> <!-- 政策资讯内容 结束 -->

          <!-- 支持力度内容 -->
          <div v-show="activeTab === '支持力度'" class="support-content policy-info-content">
            <div class="info-filters">
              <div class="filter-row">
                <div class="filter-label">选择等级：</div>
                <div class="filter-items">
                  <span v-for="item in supportLevelOptions" :key="item" :class="{ active: activeSupportLevel === item }" @click="activeSupportLevel = item">{{ item }}</span>
                </div>
              </div>
            </div>
            
            <el-table :data="supportList" border style="width: 100%" class="info-table" :header-cell-style="{ background: 'rgb(241, 247, 255)', color: '#333', textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
              <el-table-column prop="id" label="序号" width="60" />
              <el-table-column prop="level" label="支持等级" width="100" />
              <el-table-column prop="condition" label="资助条件" min-width="250" />
              <el-table-column prop="amount" label="资助金额" min-width="250" />
              <el-table-column prop="doc" label="参考文件" min-width="300">
                <template #default="scope">
                  <a href="#" class="table-link">{{ scope.row.doc }}</a>
                </template>
              </el-table-column>
            </el-table>
            
            <div class="view-all-data">
              <a href="#">查看完整数据</a>
            </div>
            <div class="pagination-wrapper">
              <el-pagination layout="prev, pager, next, jumper" :total="10" background />
            </div>
          </div> <!-- 支持力度内容 结束 -->

          <!-- 公示名单内容 -->
          <div v-show="activeTab === '公示名单'" class="publicity-content policy-info-content">
            <div class="publicity-header">
              <div class="info-sub-tabs" style="margin-bottom: 0; border-bottom: none;">
                <div v-for="tab in publicitySubTabs" :key="tab" class="sub-tab-item" :class="{ active: activePublicitySubTab === tab }" @click="activePublicitySubTab = tab">{{ tab }}</div>
              </div>
            </div>
            
            <div class="info-filters mt-20">
              <div class="filter-row" :class="{ 'is-collapsed': isPublicityAddressCollapsed }" style="align-items: flex-start;">
                <div class="filter-label" style="margin-top: 4px;">注册地址：</div>
                <div class="filter-items" style="flex:1;">
                  <span v-for="item in publicityAddressOptions" :key="item" :class="{ active: activePublicityAddress === item }" @click="activePublicityAddress = item">{{ item }}</span>
                </div>
                <div class="collapse-btn" @click="isPublicityAddressCollapsed = !isPublicityAddressCollapsed" style="color: #409eff; font-size: 14px; cursor: pointer; display: flex; align-items: center; margin-top: 4px;">
                  {{ isPublicityAddressCollapsed ? '展开' : '收起' }} 
                  <el-icon style="margin-left: 4px;"><ArrowDown v-if="isPublicityAddressCollapsed" /><ArrowUp v-else /></el-icon>
                </div>
              </div>
              <div class="filter-row mt-15">
                <div class="filter-label">选择年份：</div>
                <div class="filter-items">
                  <span v-for="item in publicityYearOptions" :key="item" :class="{ active: activePublicityYear === item }" @click="activePublicityYear = item">{{ item }}</span>
                </div>
              </div>
              <div class="filter-row mt-15">
                <div class="filter-label">已获政策：</div>
                <div class="filter-items">
                  <span v-for="item in publicityPolicyOptions" :key="item" :class="{ active: activePublicityPolicy === item }" @click="activePublicityPolicy = item">{{ item }}</span>
                </div>
              </div>
              <div class="filter-row search-row mt-15">
                <div class="filter-label">企业名称：</div>
                <div class="search-input-box">
                  <el-input v-model="publicityCompanyName" placeholder="请输入内容"></el-input>
                  <el-button type="primary" class="query-btn">查询</el-button>
                  <el-button class="reset-btn" @click="publicityCompanyName=''">重置</el-button>
                </div>
              </div>
            </div>
            
            <div class="result-count">为你找到 <span class="text-red">480</span> 条数据</div>

            <el-table :data="publicityList" border style="width: 100%" class="info-table" :header-cell-style="{ background: 'rgb(241, 247, 255)', color: '#333', textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
              <el-table-column prop="id" label="序号" width="60" />
              <el-table-column prop="name" label="企业名称" min-width="250" />
              <el-table-column prop="address" label="注册地址" min-width="250" />
              <el-table-column prop="year" label="年份" width="80" />
              <el-table-column prop="note" label="项目备注" width="100" />
              <el-table-column prop="count" label="政策数量" width="100" />
              <el-table-column label="操作" width="120">
                <template #default>
                  <a href="#" class="table-link">查看企业</a>
                </template>
              </el-table-column>
            </el-table>
            
            <div class="view-all-data">
              <a href="#">查看完整数据</a>
            </div>
            <div class="pagination-wrapper">
              <el-pagination layout="prev, pager, next, jumper" :total="480" background />
            </div>
          </div> <!-- 公示名单内容 结束 -->

          <!-- 业务线索内容 -->
          <div v-show="activeTab === '业务线索'" class="clue-content policy-info-content">
            <div class="clue-header">
              <div class="clue-title">业务线索名单</div>
            </div>
            
            <el-table :data="clueList" border style="width: 100%" class="info-table mt-20" :header-cell-style="{ background: 'rgb(241, 247, 255)', color: '#333', textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
              <el-table-column prop="id" label="序号" width="60" />
              <el-table-column prop="name" label="企业名称" min-width="250">
                <template #default="scope">
                  <a href="#" class="table-link">{{ scope.row.name }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="注册地址" min-width="250" />
              <el-table-column prop="industry" label="所属行业" min-width="200" />
              <el-table-column prop="count" label="政策数量" width="100" />
            </el-table>
            
            <div class="view-all-data">
              <a href="#">查看完整数据</a>
            </div>
            <div class="pagination-wrapper">
              <el-pagination layout="prev, pager, next, jumper" :total="720" background />
            </div>
          </div> <!-- 业务线索内容 结束 -->

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { View, Document, ChatDotSquare, Money, List, Share, FolderOpened, Download, ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const keyword = ref('')
const activeTab = ref('申报信息') // 默认选中支持力度方便您查看

// 政策资讯数据
const activeSubTab = ref('全部动态')
const filterLevel = ref('全部')
const filterYear = ref('全部')
const filterStatus = ref('全部')
const filterTitle = ref('')
const infoCurrentPage = ref(1)

const subTabs = ['全部动态', '申报动态', '公示动态', '政策动态']
const levelOptions = ['全部', '国家级', '江苏省', '南京市', '建邺区', '栖霞区', '雨花台区', '浦口区', '六合区', '南京经济技术开发区']
const yearOptions = ['全部', '2026', '2025', '2024', '2023', '2021', '2018', '2008']
const statusOptions = ['全部', '未过期', '已过期']

const policyInfoList = ref([
  { id: 1, title: '关于江苏省2026年第一批拟更名高新技术企业名单的公示', level: '江苏省', unit: '科学技术厅', publishDate: '2026-03-31', deadline: '2026-04-15', remainDays: '3', contact: '点击查看' },
  { id: 2, title: '关于江苏省2025年第三批高新技术企业更名的公告', level: '江苏省', unit: '高新技术企业认定管理工作协调小组', publishDate: '2026-03-13', deadline: '2026-03-17', remainDays: '已过期', contact: '--' },
  { id: 3, title: '对江苏省认定机构2025年认定报备的高新技术企业进行第一批补充备案的公告', level: '江苏省', unit: '其他', publishDate: '2026-03-04', deadline: '2026-03-08', remainDays: '已过期', contact: '--' },
  { id: 4, title: '关于南京杰达空间智能科技有限公司等高新技术企业资格继续有效的公告', level: '江苏省', unit: '其他', publishDate: '2026-02-06', deadline: '2026-02-11', remainDays: '已过期', contact: '--' },
  { id: 5, title: '关于公布江苏省2025年度第二批高新技术企业名单的通知', level: '江苏省', unit: '科学技术厅', publishDate: '2026-01-20', deadline: '2026-01-26', remainDays: '已过期', contact: '--' }
])

// 支持力度数据
const supportLevelOptions = ['全部', '南京市', '栖霞区', '溧水区']
const activeSupportLevel = ref('全部')
const supportList = ref([
  { id: 1, level: '南京市', condition: '对与高校联合承担国家关键技术攻关任务的专精特新企业', amount: '按照企业研发总投入的15%、最高1000万元给予支持', doc: '《南京市深化校企协同创新建设培育专精特新企业示范城市的若干政策措施》（宁政发〔2022〕88号）' },
  { id: 2, level: '南京市', condition: '对认定为国家级专精特新“小巨人”企业', amount: '100万元', doc: '《关于加强“四上”企业培育工作的实施意见》（宁政办规字〔2023〕1号）' },
  { id: 3, level: '栖霞区', condition: '首获国家级认定专精特新“小巨人”', amount: '100万元', doc: '《栖霞区深入推进引领性国家创新型城市建设的若干政策措施》' },
  { id: 4, level: '溧水区', condition: '对“专精特新”企业有新增用地扩建需求的', amount: '在空间指标、用地计划予以优先保障', doc: '《关于印发溧水区支持制造业高质量发展十条政策实施细则(2021年) 的通知》' },
  { id: 5, level: '溧水区', condition: '对省级以上“专精特新”企业', amount: '连续三年按其当年新增地方经济贡献(实际缴纳的增值税和企业所得税市、区留成部分)超过全市平均增幅部分的50%给予奖励', doc: '《关于印发溧水区支持制造业高质量发展十条政策实施细则(2021年) 的通知》' },
])

// 公示名单数据
const publicitySubTabs = ['获批公示', '补贴公示', '拟认定/拟入库/拟推荐', '考核评价公示', '受理/备案/推荐公示', '撤销公示']
const activePublicitySubTab = ref('获批公示')

const publicityAddressOptions = ['全部', '南京市 (454)', '玄武区 (72)', '秦淮区 (22)', '建邺区 (19)', '鼓楼区 (21)', '栖霞区 (42)', '雨花台区 (38)', '江宁区 (150)']
const activePublicityAddress = ref('全部')
const isPublicityAddressCollapsed = ref(true)

const publicityYearOptions = ['全部', '2025', '2024', '2023', '2022', '2021', '2020', '2019']
const activePublicityYear = ref('全部')

const publicityPolicyOptions = ['全部', '专精特新“小巨人”企业']
const activePublicityPolicy = ref('全部')

const publicityCompanyName = ref('')

const publicityList = ref([
  { id: 1, name: '南京瑞为新材料科技有限公司', address: '南京市六合区雄州街道王桥路59号', year: '2025', note: '--', count: 22 },
  { id: 2, name: '江苏星宇芯联电子科技有限公司', address: '南京市栖霞区尧化街道科创路1号4幢1201-1206室', year: '2025', note: '--', count: 59 },
  { id: 3, name: '南京开天眼无人机科技有限公司', address: '南京市建邺区奥体大街69号1栋2层211-401', year: '2025', note: '--', count: 77 },
  { id: 4, name: '南京英锐祺科技有限公司', address: '南京市玄武区长江后街6号', year: '2025', note: '--', count: 32 },
  { id: 5, name: '希烽光电科技（南京）有限公司', address: '南京市江北新区星火路17号创智大厦A座7层', year: '2025', note: '--', count: 47 },
])

// 业务线索数据
const clueList = ref([
  { id: 1, name: '胡连电子（南京）有限公司', address: '南京市江宁区禄口街道来凤路28号', industry: '计算机、通信和其他电子设备制造业', count: 83 },
  { id: 2, name: '南京矽邦半导体有限公司', address: '南京市浦口区经济开发区步月路29号', industry: '软件和信息技术服务业', count: 25 },
  { id: 3, name: '南京长江工业炉科技集团有限公司', address: '南京经济开发区仙新中路5号', industry: '专用设备制造业', count: 50 },
  { id: 4, name: '江苏苏美达机电科技有限公司', address: '南京市六合区雄州街道台中路8号', industry: '研究和试验发展', count: 46 },
  { id: 5, name: '南京马波斯自动化设备有限公司', address: '南京市江宁区滨江开发区景明大街7号', industry: '其他制造业', count: 72 },
])
</script>

<style scoped lang="scss">
.policy-detail-wrapper {
  background-color: rgb(241, 247, 255);
  min-height: 100vh;
  padding: 20px 0 40px;
  font-family: "Noto Sans SC", sans-serif !important;
  .main-container {
    margin: 0 auto;
  }

  .top-search-card {
    background: #fff;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    .search-label {
      font-size: 16px;
      color: #666;
      margin-right: 20px;
    }
    
    .search-input {
      width: 600px;
      
      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px #dcdfe6 inset;
        &:hover, &.is-focus {
          box-shadow: 0 0 0 1px rgb(16, 120, 249) inset;
        }
      }
      
      :deep(.el-input-group__append) {
        background-color: transparent;
        color: rgb(16, 120, 249);
        cursor: pointer;
        padding: 0 30px;
        font-size: 16px;
        
        &:hover {
          color: #66b1ff;
        }
      }
    }
  }

  .detail-header {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    padding: 24px 40px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      .policy-title {
        font-size: 22px;
        font-weight: bold;
        color: #323232;
        margin: 0;
      }

      .header-actions {
        display: flex;
        gap: 15px;

        .btn-focus {
          color: #ff6b00;
          border-color: #ff6b00;
          &:hover {
            background-color: #fff3e8;
          }
        }
        .btn-compare {
          color: rgb(16, 120, 249);
          border-color: rgb(16, 120, 249);
          &:hover {
            background-color: #ecf5ff;
          }
        }
      }
    }

    .header-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;

      .info-left {
        .info-text {
          color: #81879b;
          margin-right: 16px;
          font-size: 16px;
        }
        .status-text {
          color: #00b368;
          font-size: 16px;
          font-weight: bold;
        }
      }

      .info-right {
        color: #999;
        display: flex;
        align-items: center;
        gap: 20px;

        .view-count {
          display: flex;
          align-items: center;
          gap: 4px;

          .el-icon {
            font-size: 16px;
          }
        }
      }
    }
  }

  .main-card {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    .detail-header {
      border-bottom: 1px solid #ebeef5;
      padding-bottom: 20px;
      margin-bottom: 20px;

      .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .policy-title {
          font-size: 22px;
          font-weight: bold;
          color: #323232;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 15px;
          
          .btn-focus {
            color: #ff6b00;
            border-color: #ff6b00;
            &:hover {
              background-color: #fff3e8;
            }
          }
          .btn-compare {
            color: rgb(16, 120, 249);
            border-color: rgb(16, 120, 249);
            &:hover {
              background-color: #ecf5ff;
            }
          }
        }
      }

      .header-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;

        .info-left {
          .info-text {
            color: #81879b;
            margin-right: 16px;
            font-size: 16px;
          }
          .status-text {
            color: rgb(233, 55, 58);
   font-size: 16px;
    font-weight: bold;
          }
        }

        .info-right {
          color: #999;
          display: flex;
          align-items: center;
          gap: 20px;

          .view-count {
            display: flex;
            align-items: center;
            gap: 4px;
            
            .el-icon {
              font-size: 16px;
            }
          }
        }
      }
    }

    .detail-tabs {
      display: flex;
    
      margin-bottom: 30px;

      .tab-item {
        flex: 1;
        padding: 15px 0;
        font-size: 16px;
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        position: relative;

        .tab-icon-img {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        &.active {
          background: linear-gradient(180deg, #edf4ff 3%, #afd0ff);
    border-bottom: 3px solid #0055cb;
    color: #1078f9;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: rgb(16, 120, 249);
          }
        }
        
        &:not(:last-child)::before {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 14px;
            width: 1px;
            background-color: #dcdfe6;
        }

        &:hover {
          color: rgb(16, 120, 249);
        }
      }
    }

    .detail-content {
      .content-section {
        margin-bottom: 40px;

        .section-title {
          font-size: 22px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;

          .diamond-icon {
            width: 18px;
            height: 18px;
            object-fit: contain;
          }
          
          .text-blue {
            color: rgb(16, 120, 249);
            margin-left: 5px;
          }
        }

        .section-body {
          &.bg-gray {
            background-color: #f8fbff;
            padding: 25px 30px;
            border-radius: 4px;
          }

          .body-block {
            .block-header {
              margin-bottom: 15px;
              display: flex;
              align-items: center;
              gap: 10px;
            }

            .level-tag {
              background-color: #1078f9;
              color: #fff;
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 13px;
              display: inline-block;
            }

            .mb-10 {
              margin-bottom: 10px;
            }

            .block-title {
              font-weight: bold;
              color: #333;
            }

            .block-text {
              color: #000;
              line-height: 1.8;
              font-size: 16px;

              p {
                margin: 0 0 5px 0;
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }

            .text-link {
              color: rgb(16, 120, 249);
              text-decoration: none;
             
                text-decoration: underline;
              
            }

            .mt-20 {
              margin-top: 20px;
            }

            .file-list {
              .file-item {
                .file-meta {
                  font-size: 13px;
                  color: #999;
                  margin-top: 8px;
                }
              }
              .mt-15 {
                margin-top: 15px;
              }
            }

            .mb-20 {
              margin-bottom: 20px;
            }

            .text-gray {
              color: #666;
            }

            .material-list {
              .material-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                
                .item-left {
                  display: flex;
                  align-items: center;
                  gap: 10px;

                  .folder-icon {
                    color: rgb(16, 120, 249);
                    font-size: 18px;
                  }

                  .item-name {
                    font-size: 14px;
                    color: #333;
                  }
                }

              }
            }

                .down-icon-img {
                  width: 22px;
                  height: 22px;
                  object-fit: contain;
                  cursor: pointer;
                }
          }
        }
      }

      .policy-info-content {
        .info-sub-tabs {
          display: flex;
          border-bottom: 1px solid #ebeef5;
          margin-bottom: 20px;
          gap: 30px;

          .sub-tab-item {
            padding: 10px 0;
            font-size: 16px;
            cursor: pointer;
            color: #333;
            position: relative;

            &.active {
              color: rgb(16, 120, 249);
              font-weight: bold;
              &::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: rgb(16, 120, 249);
              }
            }
          }
        }

        .info-filters {
          border: 1px solid #ebeef5;
          padding: 20px;
          margin-bottom: 20px;

          .filter-row {
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            &:last-child {
              margin-bottom: 0;
            }

            .filter-label {
              width: 80px;
              color: #666;
              font-size: 14px;
            }

            .filter-items {
              display: flex;
              flex-wrap: wrap;
              gap: 20px;

              span {
                cursor: pointer;
                color: #333;
                font-size: 14px;

                &.active {
                  color: rgb(16, 120, 249);
                }
                &:hover {
                  color: rgb(16, 120, 249);
                }
              }
            }

            &.search-row {
              .search-input-box {
                display: flex;
                gap: 10px;
                align-items: center;

                .el-input {
                  width: 200px;
                }
                .query-btn {
                  background-color: rgb(16, 120, 249);
                  border-color: rgb(16, 120, 249);
                }
              }
            }
          }
        }

        .info-table {
          .table-link {
            color: rgb(16, 120, 249);
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
          .text-red {
            color: #f56c6c;
          }
        }

        .view-all-data {
          text-align: center;
          margin: 30px 0;
          
          a {
            color: rgb(16, 120, 249);
            font-size: 18px;
            font-weight: bold;
            text-decoration: none;
            letter-spacing: 2px;
            &:hover {
              text-decoration: underline;
            }
          }
        }

        .pagination-wrapper {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
      }

      .support-content {
        .info-table {
          margin-top: 20px;
        }
      }

      .publicity-content {
        .publicity-header {
          border-bottom: 1px solid #ebeef5;
          padding-bottom: 15px;
        }

        .result-count {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
          margin-top: 10px;
          .text-red {
            color: #f56c6c;
            font-weight: bold;
          }
        }
      }

      .clue-content {
        .clue-header {
          margin-bottom: 20px;
          border-bottom: 1px solid #ebeef5;
          padding-bottom: 15px;

          .clue-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
        }
      }

      /* Common styles for new tabs */
      .mt-15 { margin-top: 15px; }
      .mt-20 { margin-top: 20px; }

      .is-collapsed .filter-items {
        height: 28px;
        overflow: hidden;
      }
    }
  }
}
</style>