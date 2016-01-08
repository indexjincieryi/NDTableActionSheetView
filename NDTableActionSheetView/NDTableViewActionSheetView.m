//
//  NDTableViewActionSheetView.m
//  NDTableActionSheetView
//
//  Created by NDMAC on 16/1/8.
//  Copyright © 2016年 NDEducation. All rights reserved.
//

#import "NDTableViewActionSheetView.h"

#define SCREEN_WIDTH CGRectGetWidth([UIScreen mainScreen].bounds)
#define SCREEN_HEIGHT CGRectGetHeight([UIScreen mainScreen].bounds)
#define CELL_HEIGHT 59


@interface NDTableViewActionSheetView () <UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, strong) UIView *maskBackgroundView;
@property (nonatomic, strong) UIView *maskView;
@property (nonatomic, strong) UITableView *tableView;
@property (nonatomic, strong) UIView *bottomView;
///界面显示item数量
@property (nonatomic, assign) NSInteger showItemCount;
@property (nonatomic, strong) NSMutableArray *dataSourceArray;


@end

@implementation NDTableViewActionSheetView

#pragma mark - life cycle

- (instancetype)initWithFrame:(CGRect)frame itemArray:(NSArray *)itemArray showItemCount:(NSInteger) showItemCount bottomCellTitle:(NSString *)bottomTitle
{
    self = [super initWithFrame:frame];
    if (self) {
        self.showItemCount = showItemCount;
        self.dataSourceArray = (NSMutableArray *)itemArray;
        
        [self addSubview:self.maskBackgroundView];
    }
    return self;
}

+ (NDTableViewActionSheetView *)NDTableViewActionSheetViewWithFrame:(CGRect)frame itemArray:(NSArray *)itemArray showItemCount:(NSInteger) showItemCount bottomCellTitle:(NSString *)bottomTitle
{
    return [[NDTableViewActionSheetView alloc] initWithFrame:frame itemArray:itemArray showItemCount:showItemCount bottomCellTitle:bottomTitle];
}

#pragma mark - overwrite

#pragma mark - public

- (void)show
{
    UIWindow *window = [[UIApplication sharedApplication].windows firstObject];
    
    [window addSubview:self];
    
    [UIView animateWithDuration:.3 animations:^{
        [UIView setAnimationCurve:UIViewAnimationCurveEaseOut];
        self.maskBackgroundView.transform = CGAffineTransformMakeTranslation(0, -(CELL_HEIGHT * (self.showItemCount + 1)));
    }];
}

#pragma mark - delegate

#pragma mark -- UITableViewDataSource UITableViewDelegate

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.dataSourceArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellId = @"cellID";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellId];
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellId];
    }
    cell.textLabel.text = @"First";
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return CELL_HEIGHT;
}

#pragma mark - notification

#pragma mark - event response

- (void)dissmiss
{
    [UIView animateWithDuration:.3 animations:^{
        [UIView setAnimationCurve:UIViewAnimationCurveEaseIn];
        self.maskBackgroundView.transform = CGAffineTransformIdentity;
    } completion:^(BOOL finished) {
        [self removeFromSuperview];
    }];
}

#pragma mark - private

#pragma mark - getter and setter

- (UIView *)maskBackgroundView{
    if (_maskBackgroundView) {
        return _maskBackgroundView;
    }
    
    _maskBackgroundView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT + CELL_HEIGHT * (self.showItemCount + 1))];
    _maskBackgroundView.backgroundColor = [UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:0.1];
    
    [_maskBackgroundView addSubview:self.maskView];
    [_maskBackgroundView addSubview:self.tableView];
    [_maskBackgroundView addSubview:self.bottomView];

    return _maskBackgroundView;
}

- (UITableView *)tableView{
    if (_tableView) {
        return _tableView;
    }
    
    _tableView = [[UITableView alloc] initWithFrame:CGRectMake(0, SCREEN_HEIGHT, SCREEN_WIDTH, CELL_HEIGHT *(self.showItemCount)) style:UITableViewStylePlain];
    _tableView.dataSource = self;
    _tableView.delegate = self;
    _tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    return _tableView;
}

- (UIView *)bottomView{
    if (_bottomView) {
        return _bottomView;
    }
    
    _bottomView = [[UIView alloc] initWithFrame:CGRectMake(0, CGRectGetMaxY(self.tableView.frame), SCREEN_WIDTH, CELL_HEIGHT)];
    _bottomView.backgroundColor = [UIColor blackColor];
    return _bottomView;
}

- (UIView *)maskView{
    if (_maskView) {
        return _maskView;
    }
    
    _maskView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)];
    _maskView.backgroundColor = [UIColor clearColor];
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(dissmiss)];
    [_maskView addGestureRecognizer:tap];
    
    return _maskView;
}


@end












