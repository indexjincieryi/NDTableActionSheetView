//
//  ViewController.m
//  NDTableActionSheetView
//
//  Created by NDMAC on 16/1/8.
//  Copyright © 2016年 NDEducation. All rights reserved.
//

#import "ViewController.h"

#import "NDTableViewActionSheetView.h"

#define SCREEN_WIDTH CGRectGetWidth([UIScreen mainScreen].bounds)
#define SCREEN_HEIGHT CGRectGetHeight([UIScreen mainScreen].bounds)

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}

- (IBAction)showTableViewActionSheetClick:(id)sender {
    
    [[NDTableViewActionSheetView NDTableViewActionSheetViewWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
                                                           itemArray:@[@"dfdsf",@"sdfdsf",@"dsfdsf",@"dfdsf",@"sdfdsf",@"dsfdsf"]
                                                       showItemCount:3
                                                     bottomCellTitle:@"Test"] show];
    
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
