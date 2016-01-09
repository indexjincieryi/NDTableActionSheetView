//
//  NDTableViewActionSheetView.h
//  NDTableActionSheetView
//
//  Created by NDMAC on 16/1/8.
//  Copyright © 2016年 NDEducation. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface NDTableViewActionSheetView : UIView

/**
 *  创建自定义TableViewActionSheet
 *
 *  @param frame         frame
 *  @param itemArray     数据源
 *  @param showItemCount 界面展示几条数据
 *  @param bottomTitle   底部文字
 *
 *  @return NDTableViewActionSheetView
 */
+ (NDTableViewActionSheetView *)NDTableViewActionSheetViewWithFrame:(CGRect)frame
                                                          itemArray:(NSArray *)itemArray
                                                      showItemCount:(NSInteger) showItemCount
                                                    bottomCellTitle:(NSString *)bottomTitle;

/**
 *  控件展示
 */
- (void)show;

@end
