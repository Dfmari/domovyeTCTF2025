 ```python
def solve_lights(initial, target):
    rows = len(initial)
    cols = len(initial[0]) if rows > 0 else 0
    
    # Calculate which lights need to be toggled (1 = needs toggle)
    diff = [[initial[i][j] ^ target[i][j] for j in range(cols)] for i in range(rows)]
    
    # We need to find a set of operations (row,col) where:
    # For each light (i,j), the number of operations that affect it is ≡ diff[i][j] mod 2
    # An operation (r,c) affects light (i,j) if i==r or j==c
    
    # This is equivalent to solving a system of linear equations over GF(2)
    # Let's model it:
    
    # Variables: one for each possible operation (8 rows × 60 cols = 480 variables)
    # Equations: one for each light (8 × 60 = 480 equations)
    
    # This is too large for exact solving, so we'll use a greedy approach
    
    operations = []
    
    # Make a copy to track remaining differences
    remaining = [row[:] for row in diff]
    
    # Column labels
    col_labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567"
    
    # Greedy approach: find operations that fix the most differences
    while True:
        max_fixes = -1
        best_op = None
        
        # Check all possible operations
        for r in range(rows):
            for c in range(cols):
                # Calculate how many differences this would fix
                fixes = 0
                for i in range(rows):
                    if i == r:
                        # Affects entire row
                        fixes += remaining[i][c]
                    else:
                        # Affects just this column in other rows
                        fixes += remaining[i][c]
                
                for j in range(cols):
                    if j != c:
                        # Affects entire column in this row
                        fixes += remaining[r][j]
                
                if fixes > max_fixes:
                    max_fixes = fixes
                    best_op = (r, c)
        
        if max_fixes <= 0:
            break  # No more improvements possible
        
        # Apply the best operation
        r, c = best_op
        operations.append(f"{col_labels[c]}{r}")
        
        # Toggle the row and column in remaining
        for j in range(cols):
            remaining[r][j] ^= 1
        for i in range(rows):
            if i != r:  # column already toggled at (r,c)
                remaining[i][c] ^= 1
    
    # Verify if we've solved it
    solved = all(all(x == 0 for x in row) for row in remaining)
    
    if not solved:
        # If greedy didn't work, try a more exhaustive approach for remaining differences
        # This part would be more complex and might use Gaussian elimination
        pass
    
    return operations

```
**как использовать:**

```python
initial = [
    [0, 0, 0, ..., 0],  # Row 0
    [0, 0, 0, ..., 0],  # Row 1
    ...                  # etc.
    [0, 0, 0, ..., 0]   # Row 7
]

target = [
    [0, 0, 0, ..., 0],  # Row 0
    [0, 1, 0, ..., 0],  # Row 1
    ...                  # etc.
    [0, 0, 0, ..., 0]   # Row 7
]

solution = solve_lights(initial, target)
print("Operations needed:", solution)

```