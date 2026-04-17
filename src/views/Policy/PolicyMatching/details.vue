<template>
  <div class="enterprise-detail-page">
    <div class="main-container">
      <!-- 顶部搜索框 -->
      <div class="top-search-card">
        <div class="search-label">企业搜索</div>
        <el-input v-model="keyword" placeholder="请输入关键词搜索" class="search-input" size="large">
          <template #append>
            <el-button class="search-btn">搜索</el-button>
          </template>
        </el-input>
      </div>

      <!-- 企业信息头部卡片 -->
      <div class="company-header-card">
        <div class="company-header-top">
          <div class="company-logo">
            <!-- Placeholder for logo -->
            <div class="logo-box">
              <img src="@/assets/img/company.png"  />
            </div>
          </div>
          <div class="company-info-main">
            <div class="title-row">
              <h1 class="company-name">{{ company.name }}</h1>
              <div class="action-buttons">
                <!-- <el-button plain class="btn-invoice" @click="invoiceDialogVisible = true">发票抬头</el-button> -->
                <el-button type="primary" class="btn-follow">
                 匹配政策
                </el-button>
              </div>
            </div>

            <div class="tags-and-stats">
              <div class="tags">
                <span class="tag tag-status">存续</span>
                <span class="tag tag-former">曾用名</span>
                <span class="tag tag-level">小微企业</span>
                 <span class="tag tag-level">国有企业</span>
                  <span class="tag tag-level">高新技术企业</span>
                   <span class="tag tag-purple">科技型中小企业</span>
                    <span class="tag tag-purple">创新型中小企业</span>
              </div>
              <div class="stats">
                <el-icon><View /></el-icon> 浏览量: {{ company.views }}  {{ company.updateTime }}更新
              </div>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <span class="label">统一社会信用代码：</span>
                <span class="value">{{ company.creditCode }}</span>
              </div>
              <div class="info-item">
                <span class="label">成立日期：</span>
                <span class="value">{{ company.establishDate }}</span>
              </div>
              <div class="info-item">
                <span class="label">国标行业：</span>
                <span class="value">{{ company.industry }} <el-icon class="arrow-icon"><CaretBottom /></el-icon></span>
              </div>
              <div class="info-item">
                <span class="label">法定代表人：</span>
                <span class="value">{{ company.legalPerson }}</span>
              </div>
              <div class="info-item">
                <span class="label">电话：</span>
                <span class="value">{{ company.phone }} <a  class="link-more">查看更多</a></span>
              </div>
              <div class="info-item">
                <span class="label">网址：</span>
                <a :href="'http://' + company.website" target="_blank" class="value link-blue">{{ company.website }}</a>
              </div>
              <div class="info-item">
                <span class="label">注册资本：</span>
                <span class="value">{{ company.capital }}</span>
              </div>
              <div class="info-item">
                <span class="label">邮箱：</span>
                <span class="value">{{ company.email }}</span>
              </div>
              <div class="info-item">
                <span class="label">地址：</span>
                <span class="value">{{ company.address }}</span>
              </div>
        </div>

      

      </div>
    </div>
  </div>

      <!-- 主要内容区域 -->
      <div class="main-content-card">
        <!-- Tabs -->
        <div class="custom-tabs">
          <div 
            v-for="(tab, index) in tabs" 
            :key="index"
            class="tab-item"
            :class="{ active: activeTab === tab.name }"
            @click="activeTab = tab.name"
          >
            {{ tab.name }}
            <template v-if="tab.count !== '' && tab.count !== undefined && tab.count !== null">
              <span class="count">{{ tab.count }}</span>
            </template>
          </div>
        </div>

        <!-- 政策信息 Tab Content -->
        <div class="tab-pane" v-show="activeTab === '政策信息'">
          <div class="pane-header">
            <h2 class="pane-title">已公示政策和补助资金</h2>
            <div class="pane-stats">
              <div class="stat-badge">
                <span class="badge-label">收录已获政策总数</span>
                <span class="badge-value">12项</span>
              </div>
              <div class="stat-badge">
                <span class="badge-label">收录公示总金额</span>
                <span class="badge-value">1.1780万元</span>
              </div>
            </div>
          </div>

          <!-- 筛选条件 -->
          <div class="filter-section">
            <div class="filter-row">
              <span class="filter-label">选择年份</span>
              <div class="filter-options">
                <span 
                  v-for="year in yearOptions" 
                  :key="year"
                  class="filter-option"
                  :class="{ active: activeYear === year }"
                  @click="activeYear = year"
                >{{ year }}</span>
              </div>
            </div>
            <div class="filter-row">
              <span class="filter-label">政策等级</span>
              <div class="filter-options">
                <span 
                  v-for="level in levelOptions" 
                  :key="level"
                  class="filter-option"
                  :class="{ active: activeLevel === level }"
                  @click="activeLevel = level"
                >{{ level }}</span>
              </div>
            </div>
            <div class="filter-row search-row">
              <span class="filter-label">项目名称：</span>
              <el-input v-model="projectName" placeholder="请输入内容" class="project-input" />
              <el-button type="primary" class="btn-query">查询</el-button>
              <el-button plain class="btn-reset">重置</el-button>
            </div>
          </div>

          <!-- 表格 -->
          <div class="table-container">
            <el-table :data="pagedPolicyList" style="width: 100%" border :header-cell-style="{ background: '#f5f7fa', color: '#606266', textAlign: 'center', fontWeight: 'normal' }" :cell-style="{ textAlign: 'center' }">
              <el-table-column type="index" label="序号" width="60" :index="policyIndexMethod" />
              <el-table-column prop="level" label="政策等级" width="100" />
              <el-table-column prop="department" label="发布部门" width="160" />
              <el-table-column prop="projectName" label="政策项目名称" min-width="250" align="center">
                <template #default="scope">
                  <a href="#" class="link-blue">{{ scope.row.projectName }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="note" label="项目备注" width="180" />
              <el-table-column prop="year" label="年份" width="80" />
              <el-table-column prop="amount" label="补贴金额（万元）" width="120">
                <template #default="scope">
                  <span :class="{ 'text-blue': scope.row.amount !== '--' }">{{ scope.row.amount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template #default="scope">
                  <span v-if="scope.row.action === '暂无关联政策'" class="text-gray">{{ scope.row.action }}</span>
                  <a v-else href="#" class="link-blue">{{ scope.row.action }}</a>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="policyPage" layout="prev, pager, next, jumper, slot" :total="filteredPolicyList.length" :page-size="policyPageSize" background>
                <span class="page-slot-text">页</span>
              </el-pagination>
            </div>
          </div>
        </div>

        <!-- 基本信息 Tab：工商信息 / 股东信息 -->
        <div class="tab-pane basic-info-pane" v-show="activeTab === '基本信息'">
      

          <div v-show="activeBasicSubTab === '工商信息'" class="biz-detail-wrap">
            <table class="biz-detail-table" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th>统一社会信用代码</th>
                  <td>{{ biz.unifiedCreditCode }}</td>
                  <th>注册号</th>
                  <td>{{ biz.regNo }}</td>
                  <th>组织机构代码</th>
                  <td>{{ biz.orgCode }}</td>
                </tr>
                <tr>
                  <th>经营状态</th>
                  <td>
                    <span class="status-tag">{{ biz.operatingStatus }}</span>
                  </td>
                  <th>法定代表人</th>
                  <td>吴永林</td>
                  <th>注册资本</th>
                  <td>10000万元</td>
                </tr>
                <tr>
                  <th>企业类型</th>
                  <td>{{ biz.companyType }}</td>
                  <th>成立日期</th>
                  <td>{{ biz.establishDate }}</td>
                  <th>营业期限</th>
                  <td>{{ biz.businessTerm }}</td>
                </tr>
                <tr>
                  <th>参保人数</th>
                  <td>19人</td>
                  <th>所属行业</th>
                  <td colspan="3">{{ biz.industry }}</td>
                </tr>
                <tr>
                  <th>注册地址</th>
                  <td colspan="5">{{ biz.registeredAddress }}</td>
                </tr>
                <tr>
                  <th>最新注册地址变更日期</th>
                  <td colspan="5">{{ biz.addressChangeDate }}</td>
                </tr>
                <tr>
                  <th>经营范围</th>
                  <td colspan="5" class="scope-cell">信息技术的技术开发；计算机软硬件的技术开发、技术咨询、技术转让、技术服务及销售；计算机系统集成；设计、制作、发布国内广告；网站建设；网页设计；物联网技术开发；电梯整梯及备件销售。（依法须经批准的项目，经相关部门批准后方可开展经营活动）一般项目：仪器仪表销售；仪器仪表修理；通信设备销售；集成电路芯片及产品销售；机械设备租赁；光通信设备销售（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）</td>
                </tr>
                 <tr>
                  <th>企业简介</th>
                  <td colspan="5" class="scope-cell">江苏苏豪智能科技有限公司成立于2014年9月，董事长为吴永林。公司专注于IT软硬件研发和系统运营，业务涵盖数字政务、数智国企、智慧监管和智慧城市建设。企业以'物联感知生活，科技驱动未来'为理念，运用人工智能、大数据、物联网等技术，在特种设备监管、中小企业智改数转等领域提供解决方案。公司拥有专业领域著作权二十多项，技术团队专注于人工智能、数据中台和数字化转型。江苏苏豪智能科技有限公司近年来在科技创新领域获得多项认可，包括2025年国家级科技型中小企业和2023年国家级高新技术企业称号。在智能科技领域，江苏省机械设备行业通过政策引导和技术创新持续向高端化、智能化方向升级，为江苏苏豪智能科技提供了有利的产业发展环境。公司专注于人工智能、大数据、物联网等技术研发，在数字政务、智慧监管等领域形成技术优势。
</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-show="activeBasicSubTab === '股东信息'" class="shareholder-wrap">
            <el-table
              :data="shareholderList"
              border
              class="shareholder-table"
              :header-cell-style="shareholderTableHeaderStyle"
              :cell-style="shareholderCellStyle"
            >
              <el-table-column
                prop="shareholderName"
                label="股东（发起人）"
                min-width="220"
                align="left"
                header-align="center"
              />
              <el-table-column prop="ratio" label="持股比例" width="110" align="center" />
              <el-table-column
                prop="subscribedAmount"
                label="认缴出资额（万元）"
                min-width="160"
                align="center"
              />
              <el-table-column label="认缴出资日期" width="160" align="center">
                <template #default="scope">
                  <span>{{ scope.row.subscribedDate }}</span>
                  <a href="#" class="shareholder-detail-link" @click.prevent>详情</a>
                </template>
              </el-table-column>
              <el-table-column
                prop="paidAmount"
                label="实缴出资额（万元）"
                width="150"
                align="center"
              />
              <el-table-column prop="paidDate" label="实缴出资日期" width="140" align="center" />
            </el-table>
          </div>
        </div>

        <!-- 联系方式 -->
        <div class="tab-pane contact-pane" v-show="activeTab === '联系方式'">
          <div class="contact-type-tabs">
            <button
              v-for="item in contactTypeTabs"
              :key="item.key"
              type="button"
              class="contact-type-tab"
              :class="{ active: activeContactType === item.key }"
              @click="activeContactType = item.key"
            >
              {{ item.label }}
              <template v-if="item.count !== null && item.count !== undefined">
                <span class="type-count">{{ item.count }}</span>
              </template>
            </button>
          </div>
          <el-table
            :data="filteredContactList"
            border
            class="contact-table"
            :header-cell-style="shareholderTableHeaderStyle"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="method" label="联系方式" min-width="200" />
            <el-table-column prop="person" label="联系人" min-width="160" />
            <el-table-column prop="jobTag" label="职务标签" width="140" />
          </el-table>
          <p class="contact-disclaimer">
            所有联系方式数据均由公开数据得出，如带来困扰，您有权依照本《隐私权政策》所载明的联系方式，向我们提出更正或删除。
          </p>
        </div>

        <!-- 知识产权 -->
        <div class="tab-pane ip-pane" v-show="activeTab === '知识产权'">
          <div class="contact-type-tabs">
            <button
              v-for="item in ipSubTabs"
              :key="item.key"
              type="button"
              class="contact-type-tab"
              :class="{ active: activeIpSubTab === item.key }"
              @click="activeIpSubTab = item.key"
            >
              {{ item.label }}
              <template v-if="item.count !== null && item.count !== undefined">
                <span class="type-count">{{ item.count }}</span>
              </template>
            </button>
          </div>

          <template v-if="activeIpSubTab === '专利'">
            <div class="ip-patent-toolbar">
              <span class="ip-field-label">搜索</span>
              <el-input
                v-model="patentKeyword"
                placeholder="请输入关键词搜索"
                clearable
                class="ip-search-input"
              >
                <template #prefix>
                  <el-icon class="ip-search-icon"><Search /></el-icon>
                </template>
              </el-input>
            </div>
            <div class="ip-filter-block">
              <div class="ip-filter-row">
                <span class="ip-field-label">选择年份</span>
                <div class="ip-filter-options">
                  <span
                    v-for="y in patentYearOptions"
                    :key="y"
                    class="ip-filter-opt"
                    :class="{ active: activePatentYear === y }"
                    @click="activePatentYear = y"
                  >{{ y }}</span>
                </div>
              </div>
              <div class="ip-filter-row">
                <span class="ip-field-label">专利类型</span>
                <div class="ip-filter-options">
                  <span
                    v-for="t in patentTypeFilters"
                    :key="t"
                    class="ip-filter-opt"
                    :class="{ active: activePatentType === t }"
                    @click="activePatentType = t"
                  >{{ t }}</span>
                </div>
              </div>
              <div class="ip-filter-row">
                <span class="ip-field-label">专利状态</span>
                <div class="ip-filter-options">
                  <span
                    v-for="s in patentStatusFilters"
                    :key="s"
                    class="ip-filter-opt"
                    :class="{ active: activePatentStatus === s }"
                    @click="activePatentStatus = s"
                  >{{ s }}</span>
                </div>
              </div>
            </div>
            <el-table
              :data="patentList"
              border
              class="ip-data-table"
              empty-text="暂无数据"
              :header-cell-style="shareholderTableHeaderStyle"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column prop="name" label="专利名称" min-width="200" />
              <el-table-column prop="applyDate" label="申请日" width="110" />
              <el-table-column prop="applyNo" label="申请号" width="140" />
              <el-table-column prop="pubNo" label="公开（公布）号" width="150" />
              <el-table-column prop="pubDate" label="公开（公告）日" width="130" />
              <el-table-column prop="legalStatus" label="最新法律状态" width="120" />
              <el-table-column prop="patentType" label="专利类型" width="120" />
            </el-table>
          </template>

          <template v-else-if="activeIpSubTab === '软著'">
            <div class="ip-patent-toolbar">
              <span class="ip-field-label">搜索</span>
              <el-input
                v-model="softCopyrightKeyword"
                placeholder="请输入关键词搜索"
                clearable
                class="ip-search-input"
              >
                <template #prefix>
                  <el-icon class="ip-search-icon"><Search /></el-icon>
                </template>
              </el-input>
            </div>
            <div class="ip-filter-block">
              <div class="ip-filter-row">
                <span class="ip-field-label">选择年份</span>
                <div class="ip-filter-options">
                  <span
                    v-for="item in softCopyrightYearTabs"
                    :key="item.key"
                    class="ip-filter-opt"
                    :class="{ active: activeSoftCopyrightYear === item.key }"
                    @click="onSoftCopyrightYearClick(item.key)"
                  >
                    {{ item.label }}<template v-if="item.count != null">({{ item.count }})</template>
                  </span>
                </div>
              </div>
            </div>
            <el-table
              :data="pagedSoftCopyrightList"
              border
              class="ip-data-table"
              empty-text="暂无数据"
              :header-cell-style="shareholderTableHeaderStyle"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column prop="fullName" label="软件全称" min-width="260" align="left" header-align="center" />
              <el-table-column prop="shortName" label="软件简称" width="120" />
              <el-table-column prop="regApproveDate" label="登记批准日期" width="120" />
              <el-table-column prop="regNo" label="登记号" width="130" />
              <el-table-column prop="categoryNo" label="分类号" width="90" />
              <el-table-column prop="version" label="版本号" width="90" />
              <el-table-column prop="firstPubDate" label="首次发表日期" width="120" />
            </el-table>
            <div class="ip-pagination-wrap">
              <el-pagination
                v-model:current-page="softCopyrightPage"
                layout="prev, pager, next, jumper"
                :total="filteredSoftCopyrightList.length"
                :page-size="softCopyrightPageSize"
                background
              />
            </div>
          </template>

          <div v-else class="ip-empty-panel">暂无数据</div>
        </div>

        <!-- 资质证书 -->
        <div class="tab-pane cert-pane" v-show="activeTab === '资质证书'">
          <div class="contact-type-tabs">
            <button
              v-for="item in certSubTabs"
              :key="item.key"
              type="button"
              class="contact-type-tab"
              :class="{ active: activeCertSubTab === item.key }"
              @click="activeCertSubTab = item.key"
            >
              {{ item.label }}
              <template v-if="item.count !== null && item.count !== undefined">
                <span class="type-count">{{ item.count }}</span>
              </template>
            </button>
          </div>

          <template v-if="activeCertSubTab === '资质证书'">
            <div class="ip-patent-toolbar">
              <span class="ip-field-label">搜索</span>
              <el-input
                v-model="certKeyword"
                placeholder="请输入关键词搜索"
                clearable
                class="ip-search-input"
              >
                <template #prefix>
                  <el-icon class="ip-search-icon"><Search /></el-icon>
                </template>
              </el-input>
            </div>
            <div class="ip-filter-block">
              <div class="ip-filter-row">
                <span class="ip-field-label">选择年份</span>
                <div class="ip-filter-options">
                  <span
                    v-for="item in certYearTabs"
                    :key="item.key"
                    class="ip-filter-opt"
                    :class="{ active: activeCertYear === item.key }"
                    @click="activeCertYear = item.key"
                  >
                    {{ item.label }}
                  </span>
                </div>
              </div>
            </div>

            <el-table
              :data="filteredCertList"
              border
              class="ip-data-table"
              empty-text="暂无数据"
              :header-cell-style="shareholderTableHeaderStyle"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column
                prop="category"
                label="证书类别"
                min-width="220"
                align="left"
                header-align="center"
              >
                <template #default="scope">
                  <a href="#" class="table-link-blue" @click.prevent>{{ scope.row.category }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="证书名称" min-width="160" />
              <el-table-column prop="code" label="证书编号" min-width="170" />
              <el-table-column prop="issueDate" label="发证日期" width="130" />
              <el-table-column prop="validUntil" label="发证有效期" width="130" />
            </el-table>
          </template>

          <div v-else class="ip-empty-panel">暂无数据</div>
        </div>

        <!-- 招投标 -->
        <div class="tab-pane tender-pane" v-show="activeTab === '招投标'">
          <div class="contact-type-tabs">
            <button
              v-for="item in tenderSubTabs"
              :key="item.key"
              type="button"
              class="contact-type-tab"
              :class="{ active: activeTenderSubTab === item.key }"
              @click="activeTenderSubTab = item.key"
            >
              {{ item.label }}<span class="type-count">{{ item.count }}</span>
            </button>
          </div>

          <div class="ip-patent-toolbar">
            <span class="ip-field-label">搜索</span>
            <el-input
              v-model="tenderKeyword"
              placeholder="请输入关键词搜索"
              clearable
              class="ip-search-input"
            >
              <template #prefix>
                <el-icon class="ip-search-icon"><Search /></el-icon>
              </template>
            </el-input>
          </div>

          <div class="ip-filter-block">
            <div class="ip-filter-row">
              <span class="ip-field-label">选择年份</span>
              <div class="ip-filter-options">
                <span
                  v-for="item in tenderYearTabs"
                  :key="item.key"
                  class="ip-filter-opt"
                  :class="{ active: activeTenderYear === item.key }"
                  @click="activeTenderYear = item.key"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>
          </div>

          <el-table
            :data="pagedTenderList"
            border
            class="ip-data-table"
            empty-text="暂无数据"
            :header-cell-style="shareholderTableHeaderStyle"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="publishDate" label="发布日期" width="110" />
            <el-table-column prop="title" label="公告标题" min-width="230" align="left" header-align="center" />
            <el-table-column prop="province" label="省份地区" width="90" />
            <el-table-column prop="infoType" label="信息类型" width="100" />
            <el-table-column prop="buyer" label="采购人" min-width="145" />
            <el-table-column prop="supplier" label="供应商" min-width="145" />
            <el-table-column prop="amount" label="中标金额" width="80" />
            <el-table-column label="操作" width="60">
              <template #default>
                <a href="#" class="table-link-blue" @click.prevent>详情</a>
              </template>
            </el-table-column>
          </el-table>

          <div class="ip-pagination-wrap">
            <el-pagination
              v-model:current-page="tenderPage"
              layout="prev, pager, next, jumper"
              :total="filteredTenderList.length"
              :page-size="tenderPageSize"
              background
            />
          </div>
        </div>

        <!-- 经营异常 -->
        <div class="tab-pane abnormal-pane" v-show="activeTab === '经营异常'">
          <div class="contact-type-tabs">
            <button
              v-for="item in abnormalSubTabs"
              :key="item.key"
              type="button"
              class="contact-type-tab"
              :class="{ active: activeAbnormalSubTab === item.key }"
              @click="activeAbnormalSubTab = item.key"
            >
              {{ item.label }}
            </button>
          </div>

          <div class="ip-patent-toolbar">
            <span class="ip-field-label">搜索</span>
            <el-input
              v-model="abnormalKeyword"
              placeholder="请输入关键词搜索"
              clearable
              class="ip-search-input"
            >
              <template #prefix>
                <el-icon class="ip-search-icon"><Search /></el-icon>
              </template>
            </el-input>
          </div>

          <div v-if="activeAbnormalSubTab === 'penalty'" class="ip-filter-block">
            <div class="ip-filter-row">
              <span class="ip-field-label">选择年份</span>
              <div class="ip-filter-options">
                <span
                  v-for="item in abnormalYearTabs"
                  :key="item.key"
                  class="ip-filter-opt"
                  :class="{ active: activeAbnormalYear === item.key }"
                  @click="activeAbnormalYear = item.key"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>
          </div>

          <el-table
            v-if="activeAbnormalSubTab === 'abnormal'"
            :data="abnormalOperationList"
            border
            class="ip-data-table"
            empty-text="暂无数据"
            :header-cell-style="shareholderTableHeaderStyle"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="inDate" label="列入日期" width="120" />
            <el-table-column prop="inReason" label="列入经营异常名录原因" min-width="220" />
            <el-table-column prop="inAgency" label="列入决定机关" min-width="180" />
            <el-table-column prop="outDate" label="移出日期" width="120" />
            <el-table-column prop="outReason" label="移出经营异常名录原因" min-width="220" />
            <el-table-column prop="outAgency" label="移出决定机关" min-width="180" />
          </el-table>

          <el-table
            v-else
            :data="abnormalPenaltyList"
            border
            class="ip-data-table"
            empty-text="暂无数据"
            :header-cell-style="shareholderTableHeaderStyle"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="publicDate" label="公示日期" width="120" />
            <el-table-column prop="penaltyDate" label="处罚决定日期" width="140" />
            <el-table-column prop="docNo" label="决定书文号" min-width="180" />
            <el-table-column prop="content" label="行政处罚内容" min-width="220" />
            <el-table-column prop="illegalType" label="违法行为类型" min-width="180" />
            <el-table-column prop="agency" label="决定机关" min-width="180" />
          </el-table>
        </div>

        <!-- 信息变动 -->
        <div class="tab-pane change-pane" v-show="activeTab === '信息变动'">
          <div class="ip-patent-toolbar">
            <span class="ip-field-label">搜索</span>
            <el-input
              v-model="changeKeyword"
              placeholder="请输入关键词搜索"
              clearable
              class="ip-search-input"
            >
              <template #prefix>
                <el-icon class="ip-search-icon"><Search /></el-icon>
              </template>
            </el-input>
          </div>

          <div class="ip-filter-block">
            <div class="ip-filter-row">
              <span class="ip-field-label">选择年份</span>
              <div class="ip-filter-options">
                <span
                  v-for="item in changeYearTabs"
                  :key="item.key"
                  class="ip-filter-opt"
                  :class="{ active: activeChangeYear === item.key }"
                  @click="activeChangeYear = item.key"
                >
                  {{ item.label }}
                </span>
              </div>
            </div>
          </div>

          <el-table
            :data="pagedChangeList"
            border
            class="ip-data-table"
            empty-text="暂无数据"
            :header-cell-style="shareholderTableHeaderStyle"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="changeDate" label="变动日期" width="120" />
            <el-table-column prop="changeType" label="变动类型" width="120" />
            <el-table-column prop="before" label="变动前" min-width="220" />
            <el-table-column prop="after" label="变动后" min-width="220" />
          </el-table>

          <div class="ip-pagination-wrap">
            <el-pagination
              v-model:current-page="changePage"
              layout="prev, pager, next, jumper"
              :total="filteredChangeList.length"
              :page-size="changePageSize"
              background
            />
          </div>
        </div>

        <!-- 找服务 -->
        <div class="tab-pane empty-pane" v-show="activeTab === '找服务'">
          <el-empty description="暂无数据"></el-empty>
        </div>

        <!-- 促供需 -->
        <div class="tab-pane empty-pane" v-show="activeTab === '促供需'">
          <el-empty description="暂无数据"></el-empty>
        </div>

      </div>
    </div>

    <el-dialog
      v-model="invoiceDialogVisible"
      class="invoice-dialog"
      title="发票抬头"
      width="640px"
      align-center
    >
      <div class="invoice-content">
        <div class="invoice-row">
          <span class="invoice-label">企业名称：</span>
          <span class="invoice-value">{{ company.name }}</span>
        </div>
        <div class="invoice-row">
          <span class="invoice-label">企业税号：</span>
          <span class="invoice-value">{{ company.creditCode }}</span>
        </div>
        <div class="invoice-row">
          <span class="invoice-label">企业地址：</span>
          <span class="invoice-value">{{ company.address }}</span>
        </div>
        <div class="invoice-row">
          <span class="invoice-label">电话号码：</span>
          <span class="invoice-value">{{ company.phone }}</span>
        </div>
        <div class="invoice-row">
          <span class="invoice-label">开户银行：</span>
          <span class="invoice-value">{{ invoiceInfo.bank }}</span>
        </div>
        <div class="invoice-row">
          <span class="invoice-label">银行账户：</span>
          <span class="invoice-value">{{ invoiceInfo.account }}</span>
        </div>
      </div>
      <template #footer>
        <div class="invoice-footer">
          <el-button type="primary" @click="copyAllInvoiceInfo">全部复制</el-button>
          <el-button @click="invoiceDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="invoiceDialogVisible = false">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, View, CaretBottom, Search } from '@element-plus/icons-vue'

const keyword = ref('')
const projectName = ref('')
const invoiceDialogVisible = ref(false)
const invoiceInfo = ref({
  bank: '--',
  account: '--'
})

const company = ref({
  name: '江苏苏豪智能科技有限公司',
  creditCode: '913201063025641008',
  establishDate: '2014-09-03',
  industry: '软件和信息技术服务业',
  legalPerson: '吴永林',
  phone: '13770576917',
  website: 'www.jsleader.com',
  capital: '10000.00万人民币',
  email: '--',
  address: '南京市江宁区通淮街377号丽天花园6幢108室(江宁开发区)',
  views: '24',
  updateTime: '2025-01-06'
})

const tabs = ref([
  { name: '政策信息', count: 12 },
  { name: '基本信息', count: '' },
  { name: '联系方式', count: 5 },
  { name: '知识产权', count: 18 },
  { name: '资质证书', count: 8 },
  { name: '招投标', count: 56 },
  { name: '找服务', count: 0 },
  { name: '促供需', count: 0 }
])
const activeTab = ref('政策信息')

const activeBasicSubTab = ref('工商信息')

const biz = ref({
  unifiedCreditCode: '913201063025641008',
  regNo: '320106000260887',
  orgCode: '302564100',
  operatingStatus: '存续',
  legalRepresentative: '曹文军',
  registeredCapital: '1000.00万人民币',
  companyType: '有限责任公司(非自然人投资或控股的法人独资)',
  establishDate: '2014-09-03',
  businessTerm: '2014-09-03 至 永续经营',
  insuredCount: '12人',
  industry:
    '信息传输、软件和信息技术服务业、软件和信息技术服务业、软件和信息技术服务业',
  registeredAddress: '南京市江宁区通淮街377号丽天花园6幢108室（江宁开发区）',
  addressChangeDate: '--',
  businessScope:
    '信息技术的技术开发；计算机软硬件的技术开发、技术咨询、技术转让、技术服务及销售；计算机系统集成；设计、制作、发布国内广告；网站建设；网页设计；物联网技术开发；电梯整梯及备件销售。（依法须经批准的项目，经相关部门批准后方可开展经营活动）一般项目：仪器仪表销售；仪器仪表修理；通信设备销售；集成电路芯片及产品销售；机械设备租赁；光通信设备销售（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）'
})

const shareholderList = ref([
  {
    shareholderName: '江苏省苏豪控股集团有限公司',
    ratio: '100.00%',
    subscribedAmount: '1000.00万人民币',
    subscribedDate: '2029-06-30',
    paidAmount: '--',
    paidDate: '--'
  }
])

const shareholderTableHeaderStyle = {
  background: '#f0f5ff',
  color: '#333',
  textAlign: 'center',
  fontWeight: 'normal'
}

function shareholderCellStyle({ columnIndex }) {
  if (columnIndex === 0) return { textAlign: 'left' }
  return { textAlign: 'center' }
}

const activeContactType = ref('all')
const contactTypeTabs = [
  { key: 'all', label: '全部', count: 5 },
  { key: 'mobile', label: '手机', count: 2 },
  { key: 'landline', label: '固话', count: 3 },
  { key: 'email', label: '邮箱', count: null },
  { key: 'fax', label: '传真', count: null },
  { key: 'qq', label: 'QQ', count: null },
  { key: 'other', label: '其他', count: null },
  { key: 'wechat', label: '微信', count: null }
]
const contactList = ref([
  { type: 'mobile', method: '13770576917', person: '**翔', jobTag: '--' },
  { type: 'mobile', method: '13805188856', person: '**桂', jobTag: '--' },
  { type: 'landline', method: '025-83359861', person: '--', jobTag: '--' },
  { type: 'landline', method: '025-89621020', person: '--', jobTag: '--' },
  { type: 'landline', method: '025-84795793', person: '--', jobTag: '--' }
])
const filteredContactList = computed(() => {
  if (activeContactType.value === 'all') return contactList.value
  return contactList.value.filter((row) => row.type === activeContactType.value)
})

const activeIpSubTab = ref('专利')
const ipSubTabs = [
  { key: '专利', label: '专利', count: null },
  { key: '商标', label: '商标', count: null },
  { key: '软著', label: '软著', count: 18 },
  { key: '作品', label: '作品', count: null }
]
const patentKeyword = ref('')
const patentYearOptions = ['全部', '2026', '2025', '2024', '2023', '2022']
const activePatentYear = ref('全部')
const patentTypeFilters = ['全部', '发明专利(0)', '实用新型专利(0)', '外观设计专利(0)']
const activePatentType = ref('全部')
const patentStatusFilters = ['全部', '有效(0)', '失效(0)', '审查中(0)']
const activePatentStatus = ref('全部')
const patentList = ref([])

const activeCertSubTab = ref('资质证书')
const certSubTabs = [
  { key: '资质证书', label: '资质证书', count: 8 },
  { key: '人员信息', label: '人员信息', count: null },
  { key: '申请/审查', label: '申请/审查', count: null }
]
const certKeyword = ref('')
const activeCertYear = ref('all')
const certYearTabs = [
  { key: 'all', label: '全部' },
  { key: '2024', label: '2024' },
  { key: '2023', label: '2023' },
  { key: '2022', label: '2022' }
]
const certList = ref([
  {
    year: '2024',
    category: '管理体系认证/质量管理体系认证（ISO9001）',
    name: '--',
    code: '17322Q20581R0S',
    issueDate: '2024-06-03',
    validUntil: '2025-05-25'
  },
  {
    year: '2023',
    category: '管理体系认证/信息安全管理体系认证',
    name: '--',
    code: '17323ISMS0094R0S',
    issueDate: '2023-06-06',
    validUntil: '2025-05-06'
  },
  {
    year: '2022',
    category: '管理体系认证/环境管理体系认证',
    name: '--',
    code: '02822E11420R0S',
    issueDate: '2022-11-23',
    validUntil: '2025-11-22'
  },
  {
    year: '2022',
    category: '管理体系认证/中国职业健康安全管理体系认证',
    name: '--',
    code: '02822S11260R0S',
    issueDate: '2022-11-23',
    validUntil: '2025-11-22'
  },
  {
    year: '2022',
    category: '管理体系认证/信息安全管理体系认证',
    name: '--',
    code: '18422ISMS0036R0S',
    issueDate: '2022-05-07',
    validUntil: '2025-05-06'
  },
  {
    year: '2023',
    category: '软件产品证书',
    name: '--',
    code: '苏RC-2023-A1793',
    issueDate: '--',
    validUntil: '2028-10-25'
  },
  {
    year: '2021',
    category: '软件产品证书',
    name: '--',
    code: '苏RC-2021-A0776',
    issueDate: '--',
    validUntil: '2026-05-18'
  },
  {
    year: '2022',
    category: '软件产品证书',
    name: '--',
    code: '苏RC-2022-A1314',
    issueDate: '--',
    validUntil: '2027-07-25'
  }
])

const filteredCertList = computed(() => {
  let list = certList.value
  if (activeCertYear.value !== 'all') {
    list = list.filter((item) => item.year === activeCertYear.value)
  }
  const kw = certKeyword.value.trim()
  if (!kw) return list
  return list.filter(
    (item) => item.category.includes(kw) || item.code.includes(kw) || (item.name && item.name.includes(kw))
  )
})

const activeTenderSubTab = ref('all')
const tenderSubTabs = [
  { key: 'all', label: '全部', count: 56 },
  { key: 'tender', label: '招标', count: 16 },
  { key: 'bid', label: '中标', count: 40 }
]
const tenderKeyword = ref('')
const activeTenderYear = ref('all')
const tenderYearTabs = [
  { key: 'all', label: '全部' },
  { key: '2024', label: '2024' },
  { key: '2023', label: '2023' },
  { key: '2022', label: '2022' },
  { key: '2021', label: '2021' },
  { key: '2020', label: '2020' },
  { key: '2019', label: '2019' }
]
const tenderList = ref([
  { type: 'bid', year: '2024', publishDate: '2024-06-18', title: '江苏口岸综合运行监测平台项目的成交结果公告', province: '--', infoType: '中标公告', buyer: '江苏省电子口岸有限公司', supplier: '江苏海外集团国际工程咨询有限公司', amount: '67.98' },
  { type: 'tender', year: '2024', publishDate: '2024-04-17', title: '江苏省中小企业公共服务平台运维驻场服务项目单一来源采购公示', province: '--', infoType: '招标公告', buyer: '江苏省中小企业发展中心', supplier: '江苏招标中心有限公司江苏省招标中心有限公司', amount: '--' },
  { type: 'bid', year: '2023', publishDate: '2023-12-05', title: '江苏省电子口岸有限公司“单一窗口”口岸物流查验辅助系统（试点）成交公告', province: '--', infoType: '中标公告', buyer: '江苏省电子口岸有限公司', supplier: '苏美达国际技术贸易有限公司', amount: '53.2' },
  { type: 'bid', year: '2023', publishDate: '2023-08-04', title: '江苏省中小企业公共服务平台改造升级项目成交公告', province: '--', infoType: '中标公告', buyer: '江苏省中小企业发展中心', supplier: '江苏省招标中心有限公司', amount: '57.8' },
  { type: 'bid', year: '2023', publishDate: '2023-06-15', title: '（江苏分中心）海企研发楼及地下室（含人防）、门卫1、门卫2工程监理', province: '--', infoType: '中标公告', buyer: '江苏连特信息科技有限公司', supplier: '--', amount: '--' },
  { type: 'tender', year: '2023', publishDate: '2023-05-24', title: '江苏连特信息科技有限公司梅水工程室内湖消防设计修报招编制招标公告', province: '--', infoType: '招标公告', buyer: '南京江宁水务集团有限公司', supplier: '南京壹勘工程咨询管理有限公司', amount: '--' },
  { type: 'bid', year: '2023', publishDate: '2023-05-19', title: '海企研发楼海企研发楼及地下室（含人防），门卫1、门卫2工程监理中标结果公告', province: '--', infoType: '中标公告', buyer: '江苏连特信息科技有限公司', supplier: '--', amount: '306.86' },
  { type: 'bid', year: '2023', publishDate: '2023-05-19', title: '（江苏分中心）海企研发楼及地下室（含人防）、门卫1、门卫2工程监理', province: '--', infoType: '中标公告', buyer: '--', supplier: '--', amount: '--' },
  { type: 'bid', year: '2023', publishDate: '2023-05-17', title: '海企研发楼水土保持方案编制及监测服务项目-结果公告', province: '--', infoType: '中标公告', buyer: '江苏连特信息科技有限公司', supplier: '--', amount: '8.25' },
  { type: 'bid', year: '2023', publishDate: '2023-05-17', title: '江苏省中小企业发展中心江苏省中小企业公共服务平台运维驻场服务项目成交公告', province: '--', infoType: '中标公告', buyer: '江苏省中小企业发展中心', supplier: '江苏省招标中心有限公司', amount: '71.7' },
  
  // 第一张图（2023年）
  {
    "type": "tender",
    "year": "2023",
    "publishDate": "2023-05-06",
    "title": "海企研发楼水土保持方案编制及监测服务项目-招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2023",
    "publishDate": "2023-04-21",
    "title": "江苏省中小企业公共服务平台运维驻场服务项目单一来源采购公示",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏省中小企业发展中心",
    "supplier": "江苏省招标中心有限公司",
    "amount": "--"
  },
  {
    "type": "bid",
    "year": "2023",
    "publishDate": "2023-04-19",
    "title": "(江宁分中心) 海企研发楼及地下室(含人防)、门卫1、门卫2工程监理",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "--",
    "amount": "--"
  },
  {
    "type": "bid",
    "year": "2023",
    "publishDate": "2023-04-19",
    "title": "海企研发楼工程全过程跟踪审计服务中标候选人公示",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2023",
    "publishDate": "2023-03-29",
    "title": "(江宁分中心) 海企研发楼及地下室(含人防)、门卫1、门卫2工程监理招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "--",
    "amount": "--"
  },
  {
    "type": "bid",
    "year": "2023",
    "publishDate": "2023-03-28",
    "title": "海企研发楼临时供电工程成交候选人公示",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2023",
    "publishDate": "2023-03-27",
    "title": "海企研发楼海企研发楼及地下室(含人防)、门卫1、门卫2工程监理招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "--",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2023",
    "publishDate": "2023-03-27",
    "title": "(江宁分中心) 海企研发楼及地下室(含人防)、门卫1、门卫2工程监理招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "--",
    "amount": "--"
  },
  {
    "type": "bid",
    "year": "2023",
    "publishDate": "2023-03-21",
    "title": "海企研发楼试桩检测成交候选人公示",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2023",
    "publishDate": "2023-03-20",
    "title": "海企研发楼工程全过程跟踪审计服务招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },

  // 第二张图（2023-2022年）
  {
    "type": "bid",
    "year": "2023",
    "publishDate": "2023-03-17",
    "title": "海企研发楼试桩工程成交候选人公示",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2023",
    "publishDate": "2023-03-06",
    "title": "海企研发楼试桩工程竞争性磋商公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-11-07",
    "title": "海企研发楼工程设计中标结果公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "--",
    "amount": "377.148"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-11-07",
    "title": "(江宁分中心) 海企研发楼工程设计",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "--",
    "supplier": "--",
    "amount": "377.148"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-10-26",
    "title": "(江宁分中心) 海企研发楼工程设计",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "--",
    "supplier": "--",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2022",
    "publishDate": "2022-09-30",
    "title": "(江宁分中心) 海企研发楼工程设计招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "--",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2022",
    "publishDate": "2022-09-30",
    "title": "海企研发楼工程设计招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏连特信息科技有限公司",
    "supplier": "--",
    "amount": "--"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-07-28",
    "title": "实验室管理(南京海关)实验室监控模块2.0版升级项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "中华人民共和国南京海关",
    "supplier": "苏美达国际技术贸易有限公司",
    "amount": "49.6"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-07-04",
    "title": "江苏省中小企业公共服务平台改造升级项目江苏省中小企业公共服务平台改造升级项目合同",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省中小企业发展中心",
    "supplier": "--",
    "amount": "57.8"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-06-24",
    "title": "江苏省中小企业公共服务平台改造升级项目成交公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省中小企业发展中心",
    "supplier": "江苏省招标中心有限公司",
    "amount": "57.8"
  },

  // 第三张图（2022-2021年）
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-05-18",
    "title": "江苏省农机信息采集和报告生成系统项目二期成交结果公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省农业机械试验鉴定站",
    "supplier": "南京达琛鑫工程咨询有限公司",
    "amount": "44.9"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-05-18",
    "title": "农机试验鉴定二维码用户调查系统开发 成交结果公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省农业机械试验鉴定站",
    "supplier": "南京达琛鑫工程咨询有限公司",
    "amount": "14.95"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-05-18",
    "title": "江苏省农机信息采集和报告生成系统项目二期成交结果公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省农业机械试验鉴定站地",
    "supplier": "南京达琛鑫工程咨询有限公司",
    "amount": "44.9"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-05-18",
    "title": "农机试验鉴定二维码用户调查系统开发成交结果公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省农业机械试验鉴定站地",
    "supplier": "南京达琛鑫工程咨询有限公司",
    "amount": "14.95"
  },
  {
    "type": "tender",
    "year": "2022",
    "publishDate": "2022-05-06",
    "title": "江苏省农机信息采集和报告生成系统项目二期单一来源采购公示",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏省农业机械试验鉴定站地",
    "supplier": "南京达琛鑫工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2022",
    "publishDate": "2022-05-06",
    "title": "农机试验鉴定二维码用户调查系统开发单一来源采购公示",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏省农业机械试验鉴定站地",
    "supplier": "南京达琛鑫工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2022",
    "publishDate": "2022-05-06",
    "title": "农机试验鉴定二维码用户调查系统开发 单一来源采购公示",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏省农业机械试验鉴定站",
    "supplier": "南京达琛鑫工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "bid",
    "year": "2022",
    "publishDate": "2022-05-05",
    "title": "南京海关实验室管理监控系统开发项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "中华人民共和国南京海关",
    "supplier": "苏美达国际技术贸易有限公司",
    "amount": "47.6"
  },
  {
    "type": "bid",
    "year": "2021",
    "publishDate": "2021-10-22",
    "title": "南京海关数字动植检平台升级改造",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "中华人民共和国南京海关",
    "supplier": "--",
    "amount": "96.2"
  },
  {
    "type": "bid",
    "year": "2021",
    "publishDate": "2021-08-31",
    "title": "江苏省农业机械试验鉴定站江苏省农机信息采集和报告生成系统项目成交公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省农业机械试验鉴定站",
    "supplier": "南京方盈项目管理咨询有限公司",
    "amount": "35.549"
  },

  // 第四张图（2021-2020年）
  {
    "type": "bid",
    "year": "2021",
    "publishDate": "2021-08-30",
    "title": "南京海关数字动植检平台升级改造中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "中华人民共和国南京海关",
    "supplier": "苏美达国际技术贸易有限公司",
    "amount": "96.2"
  },
  {
    "type": "bid",
    "year": "2021",
    "publishDate": "2021-08-23",
    "title": "统计数据应用(南京海关)贸易数据分析功能规范性整合开发服务采购中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "中华人民共和国南京海关",
    "supplier": "苏美达国际技术贸易有限公司",
    "amount": "45"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-12-11",
    "title": "江苏省中小企业公共服务平台升级改造开发项目成交公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省中小企业发展中心",
    "supplier": "江苏省招标中心有限公司",
    "amount": "67.75"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-12-10",
    "title": "江苏省中小企业公共服务平台升级改造开发项目成交公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省中小企业发展中心",
    "supplier": "江苏省招标中心有限公司",
    "amount": "67.75"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-12-10",
    "title": "江苏省中小企业发展中心江苏省中小企业公共服务平台升级改造开发项目成交公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "江苏省中小企业发展中心",
    "supplier": "江苏省招标中心有限公司",
    "amount": "67.75"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-09-15",
    "title": "数据统计管理异常贸易统计数据监控项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "中华人民共和国南京海关",
    "supplier": "苏美达国际技术贸易有限公司",
    "amount": "34.8"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-09-15",
    "title": "数据统计管理(南京海关)异常贸易统计数据监控项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "中华人民共和国南京海关",
    "supplier": "苏美达国际技术贸易有限公司",
    "amount": "34.8"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-07-09",
    "title": "jjzc2020gk100智能型数字会议系统及远程视频会议系统中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "靖江市农业农村局",
    "supplier": "--",
    "amount": "78.5"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-06-19",
    "title": "海洋渔船动态监控管理系统采购项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "灌南县渔政监督大队",
    "supplier": "江苏省建信招投标有限公司",
    "amount": "77.901"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-06-06",
    "title": "(成交公告) 海洋渔船动态监控管理系统采购项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "灌南县渔政监督大队",
    "supplier": "江苏省建信招投标有限公司",
    "amount": "77.901"
  },

  // 第五张图（2020-2019年）
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-05-13",
    "title": "海洋渔船动态监控管理系统采购项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "灌南县渔政监督大队",
    "supplier": "江苏省建信招投标有限公司",
    "amount": "77.901"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-05-13",
    "title": "(成交公告) 海洋渔船动态监控管理系统采购项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "灌南县渔政监督大队",
    "supplier": "江苏省建信招投标有限公司",
    "amount": "77.901"
  },
  {
    "type": "bid",
    "year": "2020",
    "publishDate": "2020-05-13",
    "title": "(中标公告) 海洋渔船动态监控管理系统采购项目中标公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "灌南县渔政监督大队",
    "supplier": "江苏省建信招投标有限公司",
    "amount": "77.901"
  },
  {
    "type": "tender",
    "year": "2019",
    "publishDate": "2019-12-06",
    "title": "江苏省海外企业集团有限公司风险管控体系评估项目-招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏省海外企业集团有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "tender",
    "year": "2019",
    "publishDate": "2019-12-06",
    "title": "江苏省海外企业集团有限公司2019年度-2023年度财务决算审计项目-招标公告",
    "province": "--",
    "infoType": "招标公告",
    "buyer": "江苏省海外企业集团有限公司",
    "supplier": "江苏海外集团国际工程咨询有限公司",
    "amount": "--"
  },
  {
    "type": "bid",
    "year": "2019",
    "publishDate": "2019-11-18",
    "title": "南京市第二医院体检系统采购项目成交公告",
    "province": "--",
    "infoType": "中标公告",
    "buyer": "南京市第二医院",
    "supplier": "--",
    "amount": "49.18"
  },

 

])

const filteredTenderList = computed(() => {
  let list = tenderList.value
  if (activeTenderSubTab.value !== 'all') {
    list = list.filter((row) => row.type === activeTenderSubTab.value)
  }
  if (activeTenderYear.value !== 'all') {
    list = list.filter((row) => row.year === activeTenderYear.value)
  }
  const kw = tenderKeyword.value.trim()
  if (!kw) return list
  return list.filter(
    (row) =>
      row.title.includes(kw) ||
      row.buyer.includes(kw) ||
      row.supplier.includes(kw) ||
      row.publishDate.includes(kw)
  )
})

const tenderPage = ref(1)
const tenderPageSize = 10
const pagedTenderList = computed(() => {
  const start = (tenderPage.value - 1) * tenderPageSize
  return filteredTenderList.value.slice(start, start + tenderPageSize)
})

const activeAbnormalSubTab = ref('abnormal')
const abnormalSubTabs = [
  { key: 'abnormal', label: '经营异常' },
  { key: 'penalty', label: '行政处罚' }
]
const abnormalKeyword = ref('')
const activeAbnormalYear = ref('all')
const abnormalYearTabs = [{ key: 'all', label: '全部' }]
const abnormalOperationList = ref([])
const abnormalPenaltyList = ref([])

const changeKeyword = ref('')
const activeChangeYear = ref('all')
const changeYearTabs = [
  { key: 'all', label: '全部' },
  { key: '2026', label: '2026' },
  { key: '2025', label: '2025' },
  { key: '2024', label: '2024' }
]
const changeList = ref([
  { year: '2026', changeDate: '2026-01-15', changeType: '政策变动', before: '--', after: '南京市职工技能提升补贴,年份：2026' },
  { year: '2026', changeDate: '2026-01-13', changeType: '政策变动', before: '--', after: '南京市参保职工技能提升补贴,年份：2026' },
  { year: '2025', changeDate: '2025-10-10', changeType: '政策变动', before: '--', after: '国家科技型中小企业,年份：2025' },
  { year: '2025', changeDate: '2025-09-18', changeType: '政策变动', before: '--', after: '国家科技型中小企业（拟入库）,年份：2025' },
  { year: '2025', changeDate: '2025-06-06', changeType: '政策变动', before: '--', after: '南京市职工技能提升补贴,年份：2025' },
  { year: '2025', changeDate: '2025-04-21', changeType: '政策变动', before: '--', after: '南京市一次性扩岗补助,年份：2024' },
  { year: '2024', changeDate: '2024-11-27', changeType: '政策变动', before: '--', after: '江苏省稳岗返还单位,年份：2024' },
  { year: '2024', changeDate: '2024-11-06', changeType: '政策变动', before: '--', after: '国家级科技型中小企业（拟入库）,年份：2024' },
  { year: '2024', changeDate: '2024-11-01', changeType: '政策变动', before: '--', after: '江苏省科技型中小企业（拟入库）,年份：2024' },
  { year: '2024', changeDate: '2024-07-28', changeType: '招投标', before: '55', after: '56' },
  { year: '2024', changeDate: '2024-07-11', changeType: '资质证书', before: '0', after: '8' },
  { year: '2024', changeDate: '2024-07-11', changeType: '股东变更', before: '0', after: '1' },
  { year: '2024', changeDate: '2024-07-11', changeType: '软件著作权', before: '0', after: '18' },
  { year: '2024', changeDate: '2024-07-09', changeType: '招投标', before: '0', after: '55' },
  { year: '2024', changeDate: '2024-06-30', changeType: '经营范围', before: '信息技术的技术开发；计算机软硬件的技术开发、技术咨询、技术转让、技术服务及销售；计算机系统集成；设计、制作、发布国内广告；网站建设；网页设计；物联网技术开发；电梯整梯及备件销售。（依法须经批准的项目，经相关部门批准后方可开展经营活动）', after: '信息技术的技术开发；计算机软硬件的技术开发、技术咨询、技术转让、技术服务及销售；计算机系统集成；设计、制作、发布国内广告；网站建设；网页设计；物联网技术开发；电梯整梯及备件销售。（依法须经批准的项目，经相关部门批准后方可开展经营活动）一般项目：仪器仪表销售；仪器仪表修理；通信设备销售；集成电路芯片及产品销售；机械设备租赁；光通信设备销售（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）' },
  { year: '2024', changeDate: '2024-06-23', changeType: '政策变动', before: '--', after: '高新技术企业,年份：2023' },
  { year: '2024', changeDate: '2024-06-22', changeType: '政策变动', before: '--', after: '国家科技型中小企业' }
])

const filteredChangeList = computed(() => {
  let list = changeList.value
  if (activeChangeYear.value !== 'all') {
    list = list.filter((item) => item.year === activeChangeYear.value)
  }
  const kw = changeKeyword.value.trim()
  if (!kw) return list
  return list.filter(
    (item) =>
      item.changeType.includes(kw) ||
      item.after.includes(kw) ||
      item.before.includes(kw) ||
      item.changeDate.includes(kw)
  )
})

const changePage = ref(1)
const changePageSize = 10
const pagedChangeList = computed(() => {
  const start = (changePage.value - 1) * changePageSize
  return filteredChangeList.value.slice(start, start + changePageSize)
})

const softCopyrightKeyword = ref('')
const activeSoftCopyrightYear = ref('all')
const softCopyrightYearTabs = [
  { key: 'all', label: '全部', count: null },
  { key: '2023', label: '2023', count: 6 },
  { key: '2022', label: '2022', count: 5 },
  { key: '2021', label: '2021', count: 6 },
  { key: '2015', label: '2015', count: 1 }
]

const softwareCopyrightRawList = ref([
  {
    approveYear: '2023',
    fullName: '连特数字身份管控平台系统软件',
    shortName: '连特数字身份管控平台',
    regApproveDate: '2023-12-21',
    regNo: '2023SR1711150',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '--'
  },
  {
    approveYear: '2023',
    fullName: '连特国有企业组织机构信息管理系统',
    shortName: '--',
    regApproveDate: '2023-12-19',
    regNo: '2023SR1687582',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2023-05-08'
  },
  {
    approveYear: '2023',
    fullName: '连特专精特新企业培育全生命周期数据管理系统软件',
    shortName: '--',
    regApproveDate: '2023-04-11',
    regNo: '2023SR0462796',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2023-04-12'
  },
  {
    approveYear: '2023',
    fullName: '连特实验室管理监控系统软件',
    shortName: '--',
    regApproveDate: '2023-04-10',
    regNo: '2023SR0456717',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2023-04-11'
  },
  {
    approveYear: '2023',
    fullName: '连特农机信息采集和报告生成系统软件',
    shortName: '--',
    regApproveDate: '2023-03-29',
    regNo: '2023SR0411111',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2021-12-03'
  },
  {
    approveYear: '2023',
    fullName: '连特百企引航经营报送系统软件',
    shortName: '--',
    regApproveDate: '2023-01-06',
    regNo: '2023SR0033539',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2022-10-28'
  },
  {
    approveYear: '2022',
    fullName: '连特专家评审系统软件',
    shortName: '--',
    regApproveDate: '2022-12-28',
    regNo: '2022SR1619704',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2022-09-01'
  },
  {
    approveYear: '2022',
    fullName: '连特赛事报名系统软件',
    shortName: '--',
    regApproveDate: '2022-12-27',
    regNo: '2022SR1616907',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2022-07-01'
  },
  {
    approveYear: '2022',
    fullName: '连特二维码用户意见调查软件',
    shortName: '--',
    regApproveDate: '2022-11-18',
    regNo: '2022SR1545847',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2022-03-01'
  },
  {
    approveYear: '2022',
    fullName: '连特农机试验鉴定信息化系统',
    shortName: '--',
    regApproveDate: '2022-03-31',
    regNo: '2022SR0414782',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2021-08-30'
  },
  {
    approveYear: '2022',
    fullName: '连特设备维修系统',
    shortName: '--',
    regApproveDate: '2022-01-05',
    regNo: '2022SR0014930',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2021-03-05'
  },
  {
    approveYear: '2021',
    fullName: '连特汽车生产企业大数据填报系统软件',
    shortName: '汽车生产大数据',
    regApproveDate: '2021-12-17',
    regNo: '2021SR2075739',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2021-11-26'
  },
  {
    approveYear: '2021',
    fullName: '连特招投标管理系统',
    shortName: '--',
    regApproveDate: '2021-12-17',
    regNo: '2021SR2075738',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2019-12-31'
  },
  {
    approveYear: '2021',
    fullName: '连特公共示范平台数据报送系统软件',
    shortName: '--',
    regApproveDate: '2021-08-23',
    regNo: '2021SR1249763',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2020-12-25'
  },
  {
    approveYear: '2021',
    fullName: '连特智慧检测快速开发平台软件',
    shortName: '--',
    regApproveDate: '2021-07-27',
    regNo: '2021SR1109147',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2020-12-30'
  },
  {
    approveYear: '2021',
    fullName: '连特认定申报系统',
    shortName: '--',
    regApproveDate: '2021-05-10',
    regNo: '2021SR0653835',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '2020-12-18'
  },
  {
    approveYear: '2021',
    fullName: '连特异常贸易统计数据监控系统',
    shortName: '--',
    regApproveDate: '2021-05-10',
    regNo: '2021SR0654023',
    categoryNo: '--',
    version: 'V1.0',
    firstPubDate: '--'
  },
  {
    approveYear: '2015',
    fullName: '连特电梯远程监控系统软件',
    shortName: '电梯远程监控系统',
    regApproveDate: '2015-06-04',
    regNo: '2015SR098716',
    categoryNo: '30219-0000',
    version: 'V1.0',
    firstPubDate: '2015-02-12'
  }
])

const filteredSoftCopyrightList = computed(() => {
  let list = softwareCopyrightRawList.value
  if (activeSoftCopyrightYear.value !== 'all') {
    list = list.filter((r) => r.approveYear === activeSoftCopyrightYear.value)
  }
  const kw = softCopyrightKeyword.value.trim()
  if (kw) {
    list = list.filter(
      (r) =>
        r.fullName.includes(kw) ||
        r.regNo.includes(kw) ||
        (r.shortName && r.shortName !== '--' && r.shortName.includes(kw))
    )
  }
  return list
})

const softCopyrightPage = ref(1)
const softCopyrightPageSize = 10

const pagedSoftCopyrightList = computed(() => {
  const start = (softCopyrightPage.value - 1) * softCopyrightPageSize
  return filteredSoftCopyrightList.value.slice(start, start + softCopyrightPageSize)
})

function onSoftCopyrightYearClick(key) {
  activeSoftCopyrightYear.value = key
  softCopyrightPage.value = 1
}

watch(softCopyrightKeyword, () => {
  softCopyrightPage.value = 1
})

watch([tenderKeyword, activeTenderYear, activeTenderSubTab], () => {
  tenderPage.value = 1
})

watch([changeKeyword, activeChangeYear], () => {
  changePage.value = 1
})

watch(
  () => filteredSoftCopyrightList.value.length,
  (len) => {
    const maxPage = Math.max(1, Math.ceil(len / softCopyrightPageSize) || 1)
    if (softCopyrightPage.value > maxPage) softCopyrightPage.value = maxPage
  }
)

watch(
  () => filteredTenderList.value.length,
  (len) => {
    const maxPage = Math.max(1, Math.ceil(len / tenderPageSize) || 1)
    if (tenderPage.value > maxPage) tenderPage.value = maxPage
  }
)

watch(
  () => filteredChangeList.value.length,
  (len) => {
    const maxPage = Math.max(1, Math.ceil(len / changePageSize) || 1)
    if (changePage.value > maxPage) changePage.value = maxPage
  }
)

const yearOptions = ['全部', '2026', '2025', '2024', '2023', '2022']
const activeYear = ref('全部')

const levelOptions = ['全部', '国家级', '江苏省', '南京市', '鼓楼区']
const activeLevel = ref('全部')

const tableData = ref([
  { level: '南京市', department: '人力资源和社会保障局', projectName: '南京市职工技能提升补贴', note: '陆俊龙', year: '2026', amount: '市: 0.234', action: '暂无关联政策' },
  { level: '南京市', department: '人力资源和社会保障局', projectName: '南京市参保职工技能提升补贴', note: '--', year: '2026', amount: '市: 0.234', action: '暂无关联政策' },
  { level: '国家级', department: '工业和信息化部', projectName: '国家科技型中小企业', note: '2025320115A8034122', year: '2025', amount: '--', action: '跳转政策详情' },
  { level: '国家级', department: '工业和信息化部', projectName: '国家科技型中小企业（拟入库）', note: '--', year: '2025', amount: '--', action: '跳转政策详情' },
  { level: '南京市', department: '人力资源和社会保障局', projectName: '南京市职工技能提升补贴', note: '晏福祥', year: '2025', amount: '市: 0.26', action: '暂无关联政策' },
  { level: '南京市', department: '人力资源和社会保障局', projectName: '南京市一次性扩岗补助', note: '--', year: '2024', amount: '市: 0.45', action: '暂无关联政策' },
  { level: '江苏省', department: '人力资源和社会保障厅', projectName: '江苏省稳岗返还单位', note: '--', year: '2024', amount: '--', action: '暂无关联政策' },
  { level: '国家级', department: '工业和信息化部', projectName: '国家科技型中小企业（拟入库）', note: '--', year: '2024', amount: '--', action: '跳转政策详情' },
  { level: '鼓楼区', department: '人力资源和社会保障局', projectName: '南京市鼓楼区小微企业社会保险补贴', note: '社保补贴', year: '2023', amount: '--', action: '暂无关联政策' },
  { level: '南京市', department: '人力资源和社会保障局', projectName: '南京市稳岗返还', note: '--', year: '2023', amount: '--', action: '跳转政策详情' },
  { level: '国家级', department: '工业和信息化部', projectName: '国家科技型中小企业', note: '202332011500039702', year: '2023', amount: '--', action: '跳转政策详情' },
  { level: '鼓楼区', department: '人力资源和社会保障局', projectName: '南京市鼓楼区小微企业社会保险补贴', note: '社保补贴', year: '2022', amount: '--', action: '暂无关联政策' }
])

const filteredPolicyList = computed(() => {
  let list = tableData.value
  if (activeYear.value !== '全部') {
    list = list.filter((item) => item.year === activeYear.value)
  }
  if (activeLevel.value !== '全部') {
    list = list.filter((item) => item.level === activeLevel.value)
  }
  const kw = projectName.value.trim()
  if (!kw) return list
  return list.filter((item) => item.projectName.includes(kw) || item.note.includes(kw))
})

const policyPage = ref(1)
const policyPageSize = 10
const pagedPolicyList = computed(() => {
  const start = (policyPage.value - 1) * policyPageSize
  return filteredPolicyList.value.slice(start, start + policyPageSize)
})

function policyIndexMethod(index) {
  return (policyPage.value - 1) * policyPageSize + index + 1
}

async function copyAllInvoiceInfo() {
  const text = [
    `企业名称：${company.value.name}`,
    `企业税号：${company.value.creditCode}`,
    `企业地址：${company.value.address}`,
    `电话号码：${company.value.phone}`,
    `开户银行：${invoiceInfo.value.bank}`,
    `银行账户：${invoiceInfo.value.account}`
  ].join('\n')

  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制全部发票抬头信息')
  } catch {
    ElMessage.error('复制失败，请手动复制')
  }
}

watch([projectName, activeYear, activeLevel], () => {
  policyPage.value = 1
})

watch(
  () => filteredPolicyList.value.length,
  (len) => {
    const maxPage = Math.max(1, Math.ceil(len / policyPageSize) || 1)
    if (policyPage.value > maxPage) policyPage.value = maxPage
  }
)
</script>

<style scoped lang="scss">
.enterprise-detail-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20px 0 40px;

  .main-container {
    width: 1200px;
    margin: 0 auto;
  }

  :deep(.invoice-dialog) {
    .el-dialog__header {
      padding: 18px 20px 10px;
      margin-right: 0;
    }

    .el-dialog__title {
      font-size: 20px;
      font-weight: 500;
      color: #666;
    }

    .el-dialog__body {
      padding: 8px 20px 10px;
    }

    .invoice-content {
      .invoice-row {
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;
        line-height: 1.65;

        .invoice-label {
          width: 95px;
          flex-shrink: 0;
          color: #333;
          font-weight: 600;
          font-size: 16px;
        }

        .invoice-value {
          color: #666;
          font-size: 16px;
          word-break: break-all;
        }
      }
    }

    .el-dialog__footer {
      padding: 8px 20px 18px;
    }

    .invoice-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }

  .top-search-card {
    background: #fff;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    .search-label {
      font-size: 16px;
      color: #666;
      margin-right: 20px;
      white-space: nowrap;
    }

    .search-input {
      flex: 1;

      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px #dcdfe6 inset;
        &:hover, &.is-focus {
          box-shadow: 0 0 0 1px #1078f9 inset;
        }
      }

      :deep(.el-input-group__append) {
        background-color: #fff;
        color: #1078f9;
        cursor: pointer;
        padding: 0 30px;
        font-size: 16px;
        border-left: 0;

        &:hover {
          color: #66b1ff;
        }
      }
    }
  }

  .company-header-card {
    background: #fff;
    padding: 30px 40px;
    border-radius: 4px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    .company-header-top {
      display: flex;
      align-items: flex-start;
      gap: 20px;

      .company-logo {
        .logo-box {
          width: 80px;
          height: 80px;
        
         img {
          width: 100%;
          height: 100%;
          object-fit: cover;
         }
        
        }
      }

      .company-info-main {
        flex: 1;

        .title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;

          .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 0;
          }

          .action-buttons {
            display: flex;
            gap: 10px;

            .btn-invoice {
              color: #1078f9;
              border-color: #1078f9;
            }

            .btn-follow {
              background-color: #1078f9;
              border-color: #1078f9;
            }
          }
        }

        .tags-and-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;

          .tags {
            display: flex;
            gap: 10px;

            .tag {
              padding: 2px 8px;
              font-size: 12px;
              border-radius: 4px;

              &.tag-status {
                color: #52c41a;
                border: 1px solid #b7eb8f;
                background-color: #f6ffed;
              }

              &.tag-former {
                color: #1078f9;
                border: 1px solid #91caff;
                background-color: #e6f7ff;
              }

              &.tag-level {
                color: #1078f9;
                background-color: #e6f0ff;
                border: none;
              }
              // 紫色系
&.tag-purple {
  color: #722ed1;
  background-color: #f3e6ff;
  border: none;
}
// 青色/信息系
&.tag-info {
  color: #08979a;
  background-color: #e6fffb;
  border: none;
}
// 橙色/警告系
&.tag-warning {
  color: #ff7d00;
  background-color: #fff4e6;
  border: none;
}
// 绿色系
&.tag-success {
  color: #00b42a;
  background-color: #e6ffed;
  border: none;
}


            }
          }

          .stats {
            color: #999;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px 40px;
          padding: 10px;
          background-color: #f1f8ff;
          
          .info-item {
            font-size: 15px;
            display: flex;
            align-items: flex-start;
            
            .label {
              white-space: nowrap;
              
            }
            
            .value {
              color: #333;
              display: flex;
              align-items: center;
              gap: 4px;
            }

            .link-more {
              color: #1078f9;
              text-decoration: none;
              font-size: 13px;
              margin-left: 10px;
              &:hover {
                text-decoration: underline;
              }
            }

            .link-blue {
              color: #1078f9;
              text-decoration: none;
              &:hover {
                text-decoration: underline;
              }
            }
            
            .arrow-icon {
              color: #999;
              font-size: 12px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .main-content-card {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    .custom-tabs {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding: 0 0px;
      background: #f5f7fa;

      .tab-item {
        padding: 20px 25px;
        font-size: 17px;
        color: #333;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: -1px;

        .count {
          color: #999;
          font-size: 13px;
        }

        &.active {
          color: #1890ff;
          font-weight: 600;
          background: #fff;
          border: 1px solid #e8e8e8;
          border-bottom-color: #fff;
          border-radius: 4px 4px 0 0;

          .count {
            color: #1890ff;
          }

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0px;
            right: 0px;
            height: 3px;
            background-color: #1890ff;
            border-radius: 1px;
          }
        }

        &:hover:not(.active) {
          color: #1890ff;
        }
      }
    }

    /* 与「联系方式」筛选条一致：基本信息 / 联系方式 / 知识产权子标签共用 */
    .contact-type-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 12px;
      margin-bottom: 18px;
    }

    .contact-type-tab {
      padding: 6px 16px;
      font-size: 14px;
      border: 1px solid #f0f5ff;
      border-radius: 4px;
      background: #f0f5ff;
      color: #666;
      cursor: pointer;
      line-height: 1.4;

      .type-count {
        margin-left: 4px;
        font-size: 13px;
        color: #999;
      }

      &.active {
        border-color: #d9d9d9;
        color: #1890ff;
        background: #fff;

        .type-count {
          color: #1890ff;
        }
      }

      &:hover:not(.active) {
        border-color: #d9d9d9;
        color: #333;
      }
    }

    .basic-info-pane {
      padding-top: 20px;

      .contact-type-tabs {
        margin-bottom: 20px;
        padding: 0 4px;
      }

      /* 工商浅蓝底 / 股东选中白底灰边，与参考图一致 */
      .contact-type-tab:not(.active) {
        background: #f0f5ff;
        // border-color: #c5d8f0;
        color: #333;

        .type-count {
          color: #666;
        }
      }

      .contact-type-tab.active {
        background: #fff;
        border-color: #bfbfbf;
        color: #333;
        font-weight: 500;

        .type-count {
          color: #333;
        }
      }

      .contact-type-tab.active:hover {
        color: #333;
      }

      .biz-detail-wrap {
        border: 1px solid #e8e8e8;
        border-radius: 2px;
        overflow: hidden;
      }

      .biz-detail-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        font-size: 14px;

        th,
        td {
          border: 1px solid #e8e8e8;
          padding: 12px 14px;
          vertical-align: top;
          line-height: 1.6;
        }

        th {
          width: 15%;
          background: #f0f5ff;
          color: #595959;
          font-weight: normal;
          text-align: left;
          white-space: nowrap;
        }

        td {
          background: #fff;
          color: #262626;
          text-align: left;
          word-break: break-all;
        }

        .status-tag {
          display: inline-block;
          padding: 0 8px;
          font-size: 13px;
          color: #52c41a;
          border: 1px solid #b7eb8f;
          border-radius: 2px;
          background: #f6ffed;
          line-height: 22px;
        }

        .scope-cell {
          line-height: 1.75;
        }
      }

      .shareholder-wrap {
        border: 1px solid #e8e8e8;
        border-radius: 2px;
        overflow: hidden;
      }

      .shareholder-table {
        width: 100%;

        .shareholder-detail-link {
          margin-left: 6px;
          color: #1890ff;
          text-decoration: none;
          font-size: 14px;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .contact-pane {
      .contact-table {
        margin-bottom: 16px;
      }

      .contact-disclaimer {
        margin: 0;
        font-size: 11px;
        color: #999;
        line-height: 1.75;
        text-align: center;
      }
    }

    .ip-pane,
    .cert-pane,
    .tender-pane,
    .abnormal-pane,
    .change-pane {
      .ip-patent-toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;

        .ip-field-label {
          color: #666;
          font-size: 14px;
          white-space: nowrap;
        }

        .ip-search-input {
          width: 360px;
          max-width: 100%;
        }

        .ip-search-icon {
          color: #bfbfbf;
        }
      }

      .ip-filter-block {
        margin-bottom: 20px;
      }

      .ip-filter-row {
        display: flex;
        align-items: flex-start;
        margin-bottom: 12px;

        .ip-field-label {
          width: 88px;
          flex-shrink: 0;
          color: #666;
          font-size: 14px;
          line-height: 32px;
        }

        .ip-filter-options {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
        }

        .ip-filter-opt {
          font-size: 14px;
          color: #333;
          cursor: pointer;
          line-height: 32px;

          &.active {
            color: #1890ff;
            font-weight: 600;
          }

          &:hover {
            color: #1890ff;
          }
        }
      }

      .ip-data-table {
        width: 100%;
      }

      .ip-empty-panel {
        min-height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #8c8c8c;
        font-size: 14px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        background: #fafafa;
      }

      .ip-pagination-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 16px;
      }
    }

    .cert-pane,
    .tender-pane {
      .table-link-blue {
        color: #1890ff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .tab-pane {
      padding: 30px 40px;

      .pane-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;

        .pane-title {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .pane-stats {
          display: flex;
          gap: 15px;

          .stat-badge {
            display: flex;
            border: 1px solid #1078f9;
            border-radius: 4px;
            overflow: hidden;

            .badge-label {
              background-color: #0b3d88;
              color: #f9d6b4;
              padding: 6px 12px;
              font-size: 18px;
            }

            .badge-value {
              background-color: #fff;
              color: #1078f9;
              padding: 6px 12px;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
      }

      .filter-section {
        margin-bottom: 20px;

        .filter-row {
          display: flex;
          align-items: center;
          margin-bottom: 15px;

          .filter-label {
            width: 70px;
            color: #666;
            font-size: 14px;
          }

          .filter-options {
            flex: 1;
            display: flex;
            gap: 20px;

            .filter-option {
              color: #333;
              font-size: 14px;
              cursor: pointer;

              &.active {
                color: #1078f9;
                font-weight: bold;
              }

              &:hover {
                color: #1078f9;
              }
            }
          }

          &.search-row {
            .project-input {
              width: 300px;
              margin-right: 15px;
            }
            .btn-query {
              background-color: #1078f9;
              border-color: #1078f9;
            }
          }
        }
      }

      .table-container {
        .link-blue {
          color: #1078f9;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }

        .text-blue {
          color: #1078f9;
        }

        .text-gray {
          color: #999;
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
}
</style>