'''
0 - G
1 - B
2 - R
3 - Y
'''
num = 414363270630243
flag = ''
while num != 1:
    extra = num % 4
    if extra == 0:
        flag = 'G' + flag
        num = num // 4
    if extra == 1:
        flag = 'B' + flag
        num = (num - 1) // 4
    if extra == 2:
        flag = 'R' + flag
        num = (num - 2) // 4
    if extra == 3:
        flag = 'Y' + flag
        num = (num - 3) // 4
print('tctf{' + flag + '}')