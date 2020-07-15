using System;

namespace test_project
{
  public class Adder
  {
    public int X { get; set; }
    public int Y { get; set; }

    // make a warning
    private int z;

    public int Result
    {
      get {
        return X + Y;
      }
    }

  }
}
