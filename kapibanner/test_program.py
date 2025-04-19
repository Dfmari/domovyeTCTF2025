initial = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, ],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, ],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, ],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, ],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            ];

target = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
                [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, ],
                [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, ],
                [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
                [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
                [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, ],
                [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, ],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            ]; 

import numpy as np
from itertools import product

import numpy as np

def solve_lights_gf2(initial, target):
    """
    Solves the light toggling problem using Gaussian elimination over GF(2).
    Returns a list of operations (like "M3") needed to transform initial to target.
    """
    rows = len(initial)
    if rows == 0:
        return []
    cols = len(initial[0])
    
    # Column labels (A-z, 0-7)
    col_labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567"
    
    # Calculate which lights need to be toggled (XOR)
    diff = np.array([[initial[i][j] ^ target[i][j] for j in range(cols)] for i in range(rows)])
    
    # We'll model this as a system where:
    # For each light (i,j), sum of row toggles + column toggles ≡ diff[i][j] mod 2
    # But since each operation toggles one row AND one column, we need a different approach
    
    # Better approach: model each operation as affecting:
    # - all lights in its row
    # - all lights in its column
    # - light at (r,c) gets toggled twice (so no net effect)
    
    # Total variables: rows * cols (each possible operation)
    # Total equations: rows * cols (one for each light)
    
    # This would be too large (480x480), so we need to optimize
    
    # Key insight: the order of operations doesn't matter (since GF(2))
    # We can create a basis for the solution space
    
    # Build the augmented matrix
    num_vars = rows * cols
    num_eqns = rows * cols
    A = np.zeros((num_eqns, num_vars + 1), dtype=np.uint8)
    
    # Map each (r,c) operation to a variable index
    op_to_var = {(r,c): r*cols + c for r in range(rows) for c in range(cols)}
    
    # Populate the matrix
    for i in range(rows):
        for j in range(cols):
            eqn_idx = i * cols + j
            # The equation for light (i,j)
            # It's affected by:
            # 1. Any operation in row i (r=i, any c)
            for c in range(cols):
                var_idx = op_to_var[(i,c)]
                A[eqn_idx, var_idx] ^= 1
            # 2. Any operation in column j (any r, c=j)
            for r in range(rows):
                var_idx = op_to_var[(r,j)]
                A[eqn_idx, var_idx] ^= 1
            # 3. The operation at (i,j) affects it twice (so no net effect)
            # Set the target
            A[eqn_idx, -1] = diff[i][j]
    
    # Perform Gaussian elimination over GF(2)
    rank = gaussian_elimination_gf2(A)
'''
    # Check for solution existence
    for i in range(rank, num_eqns):
        if A[i, -1] != 0:
            raise ValueError("No solution exists")
'''    
    # Back substitution to find a solution
    solution = np.zeros(num_vars, dtype=np.uint8)
    for i in range(rank-1, -1, -1):
        # Find the pivot
        pivot_col = -1
        for j in range(num_vars):
            if A[i, j] == 1:
                pivot_col = j
                break
        
        if pivot_col == -1:
            continue
        
        solution[pivot_col] = A[i, -1]
        # Substitute in higher equations
        for k in range(i):
            if A[k, pivot_col] == 1:
                A[k, -1] ^= A[i, -1]
                A[k, pivot_col] = 0
    
    # Convert the solution to operations
    operations = []
    for (r,c), var_idx in op_to_var.items():
        if solution[var_idx] == 1:
            operations.append(f"{col_labels[c]}{r}")
    
    return operations

def gaussian_elimination_gf2(A):
    """Performs Gaussian elimination on matrix A over GF(2). Returns rank."""
    m, n = A.shape
    rank = 0
    
    for col in range(n-1):  # exclude augmented column
        # Find pivot row
        pivot = -1
        for row in range(rank, m):
            if A[row, col] == 1:
                pivot = row
                break
        
        if pivot == -1:
            continue
        
        # Swap rows
        A[[rank, pivot]] = A[[pivot, rank]]
        
        # Eliminate this variable from all other rows
        for row in range(m):
            if row != rank and A[row, col] == 1:
                A[row] ^= A[rank]
        
        rank += 1
    
    return rank

initial = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

target = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
]

solution = solve_lights_gf2(initial, target)
print("Operations needed:", solution)