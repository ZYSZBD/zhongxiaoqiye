<template>
  <div class="policy-matching">
    <!-- Header banner -->
    <div class="page-banner">
      <div class="banner-title">
        <img src="@/assets/img/lstart.png" class="star-icon" alt="" v-if="hasLstart" @error="hasLstart = false"/>
        <span class="diamond" v-else>◆</span>
      <span> <span class="highlight">政策</span>匹配</span>
        <img src="@/assets/img/rstart.png" class="star-icon" alt="" v-if="hasRstart" @error="hasRstart = false"/>
        <span class="diamond" v-else>◆</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-container">
      <!-- Search Box Area -->
       <div class="results-card"> 
      <div class="search-card">
        <div class="search-left">
          <div class="search-title">企业找政策<span class="sub-text">(匹配政策)</span></div>
          <div class="search-desc">目前已有条国家级政策、条省级政策、条市级政策加入匹配</div>
          <div class="search-input-wrapper">
            <el-input
              v-model="keyword"
              placeholder="请输入企业关键词（仅限企业数据库企业）"
              class="custom-search-input"
              size="large"
            >
              <template #append>
                <el-button @click="$router.push('/policy/PolicyMatching/details')" :icon="Search" class="search-btn"></el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="search-right">
           <!-- Illustration Placeholder using SVG -->
           <div class="illustration-placeholder">
               <img src="@/assets/img/policypic.png" />
           </div>
        </div>
        
      </div>
  <img src="@/assets/img/policy.jpg" class="policy-pic" alt=""  />
       </div>

      
     
    </div>



  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Medal, Star, StarFilled, OfficeBuilding, Document } from '@element-plus/icons-vue'

const keyword = ref('')
const hasLstart = ref(true)
const hasRstart = ref(true)
 
</script>

<style scoped lang="scss">
.policy-matching {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 40px;

    .highlight {
      color: #1078f9;
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

      .star-icon {
        width: 16px;
        height: 16px;
      }
      .diamond {
        color: #409eff;
        font-size: 14px;
      }
    }
  }

 

  .search-card {
  
    padding:0 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
   border-bottom: 1px solid #e7e7e7;
    margin-bottom: 20px;

    .search-left {
      flex: 1;
 

      .search-title {
        font-size: 22px;
 
        margin-bottom:6px;

        .sub-text {
 
    
          font-weight: normal;
        }
      }

      .search-desc {
        font-size: 16px;
        color: #819fb9;
        margin-bottom: 22px;
      }

      .search-input-wrapper {
        :deep(.el-input__wrapper) {
          border: 1px solid #1078f9;
          box-shadow: none;
          padding-left: 15px;
          &:hover, &.is-focus {
            box-shadow: none;
          }
        }
        :deep(.el-input-group__append) {
          background-color: transparent;
         border: 1px solid #1078f9;
          border-left: 0;
          color: #1078f9;
          font-size: 16px;
          padding: 0 25px;
          cursor: pointer;
        }
      }
    }

    .search-right {
      width: 300px;
      height: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 100px;
      
      .illustration-placeholder img{
        width: 220px;
       
      }
    }
  }

  .results-card {
    background: #fff;
    border-radius: 8px;
  
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

   
  }
   .policy-pic {
      width: 72%;
      margin-left: 14%;
      height: auto;
    }
}
</style>
