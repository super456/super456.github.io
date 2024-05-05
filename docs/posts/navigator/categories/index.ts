import type { NavData } from './types'

// import common from './common'
import AI from './AI'
import React from './React'
import Vue from './Vue'
import JavaScript from './JavaScript'
import CSS from './CSS'
import HTML from './HTML'
import applet from './applet'
import Node from './Node'
import VisualData from './VisualData'
import packaging from './packaging'
import siteGenerator from './siteGenerator'
import iconLibrary from './iconLibrary'
import study from './study'
import community from './community'
import fish from './fish'
import interesting from './interesting'
import blogs from './blogs'
import weekly from './weekly'
import crossPlatform from './crossPlatform'
import sameCategories from './sameCategories'
import interview from './interview'
import system from './system'
import github from './github'
import devTools from './devTools'
import algorithm from './algorithm'
import team from './team'
import lowCode from './lowCode'

export const NAV_DATA: NavData[] = [
  // common,
  AI,
  HTML,
  CSS,
  JavaScript,
  Vue,
  React,
  Node,
  packaging,
  devTools,
  lowCode,
  system,
  study,
  interview,
  algorithm,
  blogs,
  team,
  weekly,
  community,
  applet,
  crossPlatform,
  VisualData,
  siteGenerator,
  iconLibrary,
  interesting,
  github,
  sameCategories,
  fish,
]

/** 计算收录内容统计 */
export function getNavDataCount() {
  const navCountInfo = {
    total: 0,
    categoryNum: NAV_DATA.length,
  }

  NAV_DATA.forEach((nav) => {
    navCountInfo.total += nav.items.length
  })

  return navCountInfo
}
