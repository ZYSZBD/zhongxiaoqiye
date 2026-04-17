import request from '@/utils/request';

// 模块化接口管理：公共接口模块
export const getSiteInfo = () => {
  return request({
    url: '/common/site-info',
    method: 'get'
  });
};

export const getBanners = () => {
  return request({
    url: '/common/banners',
    method: 'get'
  });
};

// 产品相关接口
export const getProductList = (params) => {
  return request({
    url: '/products',
    method: 'get',
    params
  });
};

export const getProductDetail = (id) => {
  return request({
    url: `/products/${id}`,
    method: 'get'
  });
};

// 新闻相关接口
export const getNewsList = (params) => {
  return request({
    url: '/news',
    method: 'get',
    params
  });
};

export const getNewsDetail = (id) => {
  return request({
    url: `/news/${id}`,
    method: 'get'
  });
};
