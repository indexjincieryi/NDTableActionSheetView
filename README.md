# NDTableActionSheetView
You can simply use a NDTableActionSheetView to completion

# Usage

* Use API

```objc
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
```

* Use Example

```objc

[[NDTableViewActionSheetView NDTableViewActionSheetViewWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
itemArray:@[@"dfdsf",@"sdfdsf",@"dsfdsf",@"dfdsf",@"sdfdsf",@"dsfdsf"]
showItemCount:3
bottomCellTitle:@"Test"] show];

@end
```

# More Info

Have a question? Please [open an issue](https://github.com/indexjincieryi/NDTableActionSheetView/issues)!
