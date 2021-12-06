export default {
  'post|/test/getGroupInfoById': {
    'groupAccId|1-100': 1,
    'groupTitle': '@ctitle',
    'controllerName': '@cname',
    'coreMember|1-20': 5,
    'childGroupMember|1-20': 3
  },
  'post|/test/getGroupfamilyInfoById': {
    current_page: 1,
    'rows|20': [{
      'groupAccId|+1': 1,
      'companyCode': '@id',
      'companyName': '@ctitle',
      'belongIndustry|1-5': 1,
      'socialCreditCode': '@id',
      'holdingRatio|1-100': 1,
      'legalRepresentative': '@cname',
      'companyLevel|1-3': 1
    }],
    total: 65
  },
  'post|/test/getNotMergeGroupInfo': {
    current_page: 1,
    'rows|20': [{
      'company_code': '@id',
      'company_name': '@ctitle',
      'holding_ratio|1-100': 1,
      'groupInfoDTOList|3': [
        {
          'group_accId|+1': 1,
          'groupTitle': '@ctitle',
          'controllerName': '@cname',
          'coreMember|1-20': 5,
          'childGroupMember|1-20': 3
        }
      ]
    }],
    total: 65
  },
  'post|/test/getGroupTile': {
    current_page: 1,
    'groupTitle': [
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname'
    ],
    total: 65
  },
  'post|/test/getCompanyName': {
    current_page: 1,
    'companyName': [
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname',
      '测试@cname'
    ],
    total: 65
  },
  'post|/test/getGroupInfo': {
    current_page: 1,
    'rows|20': [{
      'groupAccId|+1': 1,
      'groupTitle': '@ctitle',
      'controllerName': '@cname',
      'coreMember|1-20': 5
    }],
    total: 65
  },
  'post|/test/getChildGroupInfoById': {
    current_page: 1,
    'rows|20': [{
      'groupTitle': '@ctitle',
      'coreMember|1-20': 5,
      'controllerName': '@cname',
      'childGroupfamilyInfoDTO|3': [
        {
          'groupAccId|+1': 1,
          'companyCode': '@id',
          'companyName': '@ctitle',
          'belongIndustry|1-5': 1,
          'socialCreditCode': '@id',
          'holdingRatio|1-100': 1,
          'legalRepresentative': '@cname',
          'companyLevel|1-3': 1
        }
      ]
    }],
    total: 65
  }
}
