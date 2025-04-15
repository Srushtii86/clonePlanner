export const questions = [
  {
    id: 1,
    questionText: "What is the time complexity of binary search on a sorted linked list?",
    options: [
      { id: 'a', answerText: "O(n)" },
      { id: 'b', answerText: "O(log n)" },
      { id: 'c', answerText: "O(n log n)" },
      { id: 'd', answerText: "O(1)" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 2,
    questionText: "Which data structure is used for implementing recursion internally in a program?",
    options: [
      { id: 'a', answerText: "Stack" },
      { id: 'b', answerText: "Queue" },
      { id: 'c', answerText: "Array" },
      { id: 'd', answerText: "Linked List" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 3,
    questionText: "In a binary tree, if the inorder and preorder traversals are the same, what can be said about the tree?",
    options: [
      { id: 'a', answerText: "It is a full binary tree" },
      { id: 'b', answerText: "It is a skewed tree" },
      { id: 'c', answerText: "It is a complete binary tree" },
      { id: 'd', answerText: "It is a balanced binary tree" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 4,
    questionText: "Which of the following methods can be used to implement a depth-first search without recursion?",
    options: [
      { id: 'a', answerText: "Stack" },
      { id: 'b', answerText: "Queue" },
      { id: 'c', answerText: "Priority Queue" },
      { id: 'd', answerText: "Hash Set" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 5,
    questionText: "Given an array of n elements, how many elements must be checked to find the majority element using Moore’s voting algorithm?",
    options: [
      { id: 'a', answerText: "n" },
      { id: 'b', answerText: "n/2" },
      { id: 'c', answerText: "n-1" },
      { id: 'd', answerText: "log n" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 6,
    questionText: "Which sorting algorithm is guaranteed to have a best-case time complexity worse than O(n log n)?",
    options: [
      { id: 'a', answerText: "Quick Sort" },
      { id: 'b', answerText: "Heap Sort" },
      { id: 'c', answerText: "Bubble Sort" },
      { id: 'd', answerText: "Merge Sort" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 7,
    questionText: "Which of the following algorithms can detect a cycle in a directed graph?",
    options: [
      { id: 'a', answerText: "DFS with backtracking" },
      { id: 'b', answerText: "BFS with a queue" },
      { id: 'c', answerText: "Dijkstra's Algorithm" },
      { id: 'd', answerText: "Topological Sorting" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 8,
    questionText: "What is the purpose of the ‘Kahn’s algorithm’?",
    options: [
      { id: 'a', answerText: "Finding the shortest path in a graph" },
      { id: 'b', answerText: "Finding a topological sort of a graph" },
      { id: 'c', answerText: "Detecting negative cycles in a graph" },
      { id: 'd', answerText: "Minimizing spanning trees" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 9,
    questionText: "Which of the following can efficiently check if a number is prime?",
    options: [
      { id: 'a', answerText: "Sieve of Eratosthenes" },
      { id: 'b', answerText: "Miller-Rabin primality test" },
      { id: 'c', answerText: "Trial division" },
      { id: 'd', answerText: "Euclidean algorithm" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 10,
    questionText: "What is the amortized time complexity of a series of m operations on a dynamic array?",
    options: [
      { id: 'a', answerText: "O(m)" },
      { id: 'b', answerText: "O(m log m)" },
      { id: 'c', answerText: "O(m/n)" },
      { id: 'd', answerText: "O(m * log n)" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 11,
    questionText: "Which tree traversal algorithm has the time complexity O(n) in the average case?",
    options: [
      { id: 'a', answerText: "Breadth-First Search (BFS)" },
      { id: 'b', answerText: "Inorder Traversal" },
      { id: 'c', answerText: "Depth-First Search (DFS)" },
      { id: 'd', answerText: "All of the above" }
    ],
    correctAnswer: 'd'
  },
  {
    id: 12,
    questionText: "In a min-heap, what is the time complexity to extract the minimum element?",
    options: [
      { id: 'a', answerText: "O(log n)" },
      { id: 'b', answerText: "O(n)" },
      { id: 'c', answerText: "O(1)" },
      { id: 'd', answerText: "O(n log n)" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 13,
    questionText: "Which of the following problems can be solved using dynamic programming?",
    options: [
      { id: 'a', answerText: "Knapsack Problem" },
      { id: 'b', answerText: "Graph Traversal" },
      { id: 'c', answerText: "Finding the maximum element in an array" },
      { id: 'd', answerText: "Insertion into a binary search tree" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 14,
    questionText: "Which of the following data structures gives the best performance for finding the kth smallest element in a stream of n elements?",
    options: [
      { id: 'a', answerText: "Min-Heap" },
      { id: 'b', answerText: "Max-Heap" },
      { id: 'c', answerText: "Binary Search Tree" },
      { id: 'd', answerText: "Hash Set" }
    ],
    correctAnswer: 'a'
  },
  {
    id: 15,
    questionText: "How does the Tortoise and Hare algorithm detect a cycle in a linked list?",
    options: [
      { id: 'a', answerText: "By comparing the addresses of the nodes" },
      { id: 'b', answerText: "By moving one pointer twice as fast as the other" },
      { id: 'c', answerText: "By storing visited nodes in a hash set" },
      { id: 'd', answerText: "By counting the length of the list" }
    ],
    correctAnswer: 'b'
  }
];
